import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'

const FrameworkPage = lazy(() => import('./pages/FrameworkPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const MapPage = lazy(() => import('./pages/MapPage'))
const ComparePage = lazy(() => import('./pages/ComparePage'))
const SelectorPage = lazy(() => import('./pages/SelectorPage'))
const PathsPage = lazy(() => import('./pages/PathsPage'))
const StatsPage = lazy(() => import('./pages/StatsPage'))
const TimelinePage = lazy(() => import('./pages/TimelinePage'))
const AgentPage = lazy(() => import('./pages/AgentPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function Loading() {
  return (
    <div style={{ padding: '64px 24px', maxWidth: 760, margin: '0 auto' }}>
      <div style={{ width: 200, height: 14, borderRadius: 4, background: 'var(--surface)', marginBottom: 12, animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ width: 320, height: 32, borderRadius: 4, background: 'var(--surface)', marginBottom: 24, animation: 'pulse 1.5s ease-in-out infinite 0.1s' }} />
      <div style={{ width: '100%', height: 12, borderRadius: 4, background: 'var(--surface)', marginBottom: 8, animation: 'pulse 1.5s ease-in-out infinite 0.2s' }} />
      <div style={{ width: '80%', height: 12, borderRadius: 4, background: 'var(--surface)', animation: 'pulse 1.5s ease-in-out infinite 0.3s' }} />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/frameworks/:slug" element={<Suspense fallback={<Loading />}><FrameworkPage /></Suspense>} />
        <Route path="/category/:slug" element={<Suspense fallback={<Loading />}><CategoryPage /></Suspense>} />
        <Route path="/map" element={<Suspense fallback={<Loading />}><MapPage /></Suspense>} />
        <Route path="/compare" element={<Suspense fallback={<Loading />}><ComparePage /></Suspense>} />
        <Route path="/selector" element={<Suspense fallback={<Loading />}><SelectorPage /></Suspense>} />
        <Route path="/paths" element={<Suspense fallback={<Loading />}><PathsPage /></Suspense>} />
        <Route path="/insights" element={<Suspense fallback={<Loading />}><StatsPage /></Suspense>} />
        <Route path="/timeline" element={<Suspense fallback={<Loading />}><TimelinePage /></Suspense>} />
        <Route path="/agent" element={<Suspense fallback={<Loading />}><AgentPage /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<Loading />}><NotFoundPage /></Suspense>} />
      </Route>
    </Routes>
  )
}
