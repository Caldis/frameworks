import { useEffect, useRef } from 'react'

interface ShaderCanvasProps {
  color: [number, number, number]
  className?: string
}

const VERT = `attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`

const FRAG = `precision mediump float;
uniform float u_time;
uniform vec2 u_res;
uniform vec3 u_color;

vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}

float snoise(vec2 v){
  const vec4 C=vec4(.211324865,.366025404,-.577350269,.024390244);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz;
  x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m;m=m*m;
  vec3 x=2.*fract(p*C.www)-1.;
  vec3 h=abs(x)-.5;
  vec3 ox=floor(x+.5);
  vec3 a0=x-ox;
  m*=1.79284291-.85373472*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float n1=snoise(uv*2.5+u_time*.08)*.5+.5;
  float n2=snoise(uv*4.-u_time*.04+3.7)*.5+.5;
  float n3=snoise(uv*1.5+u_time*.12+7.3)*.5+.5;
  float n=n1*.5+n2*.3+n3*.2;

  vec3 warm=vec3(.96,.949,.925);
  vec3 col=mix(warm,u_color,n*.18);
  col+=.012*snoise(uv*80.+u_time*.5);

  gl_FragColor=vec4(col,1.);
}`

export default function ShaderCanvas({ color, className }: ShaderCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<{ gl: WebGLRenderingContext; locs: Record<string, WebGLUniformLocation | null>; raf: number } | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
    if (!gl) return

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vs, VERT)
    gl.compileShader(vs)

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fs, FRAG)
    gl.compileShader(fs)

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // Fullscreen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const locs = {
      time: gl.getUniformLocation(prog, 'u_time'),
      res: gl.getUniformLocation(prog, 'u_res'),
      color: gl.getUniformLocation(prog, 'u_color'),
    }

    const start = performance.now()
    let raf = 0

    const render = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }

      const t = (performance.now() - start) / 1000
      gl.uniform1f(locs.time, t)
      gl.uniform2f(locs.res, w, h)
      gl.uniform3f(locs.color, color[0], color[1], color[2])
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)
    glRef.current = { gl, locs, raf }

    return () => {
      cancelAnimationFrame(raf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  // Update color without recreating GL context
  useEffect(() => {
    if (glRef.current?.locs.color && glRef.current.gl) {
      glRef.current.gl.uniform3f(glRef.current.locs.color, color[0], color[1], color[2])
    }
  }, [color])

  return <canvas ref={ref} className={className} />
}
