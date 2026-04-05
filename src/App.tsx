import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<div>Home — Building...</div>} />
        <Route path="/frameworks/:slug" element={<div>Framework Detail</div>} />
        <Route path="/category/:slug" element={<div>Category</div>} />
        <Route path="/map" element={<div>Map</div>} />
      </Route>
    </Routes>
  )
}
