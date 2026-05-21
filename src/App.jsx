import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import StudyBanner from './components/StudyBanner'
import Portfolio from './pages/Portfolio'
import Tracker from './pages/Tracker'
import Resources from './pages/Resources'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('soc-theme') || 'dark')

  useEffect(() => {
    localStorage.setItem('soc-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <HashRouter>
      <div className={`min-h-screen bg-gray-950 text-gray-100 ${theme === 'light' ? 'light' : ''}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <StudyBanner />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
