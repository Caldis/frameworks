const fs = require('fs')
const path = require('path')

const baseUrl = 'https://sdframe.caldis.me'
const categories = ['thinking','architecture','coding','quality','deployment','evolution','ai','data','security','distributed','api','team','observability']

const urls = [
  '/',
  '/map',
  '/compare',
  '/selector',
  '/paths',
  '/insights',
  '/timeline',
]

// Add category pages
categories.forEach(c => urls.push(`/category/${c}`))

// Add framework pages
categories.forEach(c => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'frameworks', `${c}.json`), 'utf-8'))
  data.forEach(f => urls.push(`/frameworks/${f.slug}`))
})

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${baseUrl}${u}</loc></url>`).join('\n')}
</urlset>`

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemap)
console.log(`Sitemap generated: ${urls.length} URLs`)
