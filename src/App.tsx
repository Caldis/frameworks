import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import FrameworkPage from './pages/FrameworkPage'
import CategoryPage from './pages/CategoryPage'
import MapPage from './pages/MapPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/frameworks/:slug" element={<FrameworkPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/map" element={<MapPage />} />
      </Route>
    </Routes>
  )
}
