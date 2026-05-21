import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Portfolio from './pages/Portfolio'
import Tracker from './pages/Tracker'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/tracker" element={<Tracker />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
