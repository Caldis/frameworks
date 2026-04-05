import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div style={{ padding: '64px 48px', fontFamily: 'var(--font-serif)' }}><h1>100 Software Design Frameworks</h1><p style={{ fontFamily: 'var(--font-sans)', color: '#666', marginTop: 8 }}>Scaffolding complete. Building...</p></div>} />
    </Routes>
  )
}
