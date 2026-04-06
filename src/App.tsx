import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'

const FrameworkPage = lazy(() => import('./pages/FrameworkPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const MapPage = lazy(() => import('./pages/MapPage'))
const ComparePage = lazy(() => import('./pages/ComparePage'))
const SelectorPage = lazy(() => import('./pages/SelectorPage'))

function Loading() {
  return <div style={{ padding: '64px 0', textAlign: 'center', color: '#999', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Loading...</div>
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
      </Route>
    </Routes>
  )
}
