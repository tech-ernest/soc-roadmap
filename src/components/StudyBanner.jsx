import { Link } from 'react-router-dom'
import { phases } from '../data/roadmap'

export default function StudyBanner() {
  const active = phases.find((p) => p.status === 'in-progress')
  if (!active) return null

  return (
    <div className="bg-green-500/10 border-b border-green-500/20 px-6 py-2">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-gray-400">Currently studying:</span>
          <span className="text-green-400 font-medium">{active.name}</span>
          <span className="text-gray-500 hidden sm:inline">&mdash; {active.cert}</span>
        </div>
        <Link
          to="/tracker"
          className="text-green-400 text-xs hover:text-green-300 transition-colors font-medium"
        >
          View progress →
        </Link>
      </div>
    </div>
  )
}
