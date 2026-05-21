import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const linkClass = (path) =>
    pathname === path
      ? 'text-green-400 font-medium'
      : 'text-gray-400 hover:text-gray-200 transition-colors'

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-14">
        <span className="font-mono font-bold text-green-400 tracking-tight">
          tech-ernest
        </span>
        <div className="flex gap-6 text-sm">
          <Link to="/" className={linkClass('/')}>Portfolio</Link>
          <Link to="/tracker" className={linkClass('/tracker')}>Tracker</Link>
        </div>
      </div>
    </nav>
  )
}
