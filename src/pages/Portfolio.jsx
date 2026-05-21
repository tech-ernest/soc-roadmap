import { Link } from 'react-router-dom'
import { phases, completedCerts, skills } from '../data/roadmap'

const statusStyle = {
  completed: 'bg-green-500/15 text-green-400 border border-green-500/30',
  'in-progress': 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
  planned: 'bg-gray-500/15 text-gray-400 border border-gray-500/30',
}

const statusLabel = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
}

const borderColor = {
  green: 'border-l-green-500',
  blue: 'border-l-blue-500',
  yellow: 'border-l-yellow-500',
  red: 'border-l-red-500',
  purple: 'border-l-purple-500',
}

const accentText = {
  green: 'text-green-400',
  blue: 'text-blue-400',
  yellow: 'text-yellow-400',
  red: 'text-red-400',
  purple: 'text-purple-400',
}

export default function Portfolio() {
  const inProgress = phases.filter((p) => p.status === 'in-progress').length
  const planned = phases.filter((p) => p.status === 'planned').length

  return (
    <main className="max-w-4xl mx-auto px-6 py-14 space-y-16">

      {/* Hero */}
      <section className="space-y-5">
        <p className="font-mono text-green-400 text-sm">$ whoami</p>
        <h1 className="text-4xl font-bold text-white leading-tight">
          Ernest Petrosius
        </h1>
        <p className="text-xl text-gray-400">IT Support Engineer → SOC Analyst</p>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          3+ years in MSP infrastructure — Entra ID, Intune, Exchange Online, WatchGuard —
          now transitioning full-time into cybersecurity. Targeting a SOC Analyst role by
          end of 2026.
        </p>
        <div className="flex gap-3 pt-1">
          <Link
            to="/tracker"
            className="bg-green-500 hover:bg-green-400 transition-colors text-gray-950 font-semibold text-sm px-5 py-2 rounded-lg"
          >
            View Progress
          </Link>
          <a
            href="https://github.com/tech-ernest"
            target="_blank"
            rel="noreferrer"
            className="border border-gray-700 hover:border-gray-500 transition-colors text-gray-300 text-sm px-5 py-2 rounded-lg"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-3xl font-bold text-green-400">{completedCerts.length}</p>
          <p className="text-gray-500 text-sm mt-1">Certs Completed</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-3xl font-bold text-yellow-400">{inProgress}</p>
          <p className="text-gray-500 text-sm mt-1">In Progress</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-3xl font-bold text-gray-400">{planned}</p>
          <p className="text-gray-500 text-sm mt-1">Planned</p>
        </div>
      </section>

      {/* Completed certs */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Completed Certifications</h2>
        <div className="flex flex-wrap gap-3">
          {completedCerts.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2"
            >
              <span className="text-green-400 text-sm">✓</span>
              <span className="text-gray-200 text-sm">{cert.name}</span>
              <span className="text-gray-500 text-xs">{cert.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">6-Month Roadmap</h2>
        <div className="space-y-3">
          {phases.map((phase, i) => (
            <div
              key={phase.id}
              className={`bg-gray-900 border border-gray-800 border-l-4 ${borderColor[phase.color]} rounded-xl p-5 flex gap-5 items-start`}
            >
              <span className="text-2xl font-bold text-gray-700 w-6 shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="font-semibold text-white">{phase.name}</h3>
                    <p className="text-gray-500 text-sm mt-0.5">
                      {phase.months} &middot; {phase.duration}
                    </p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full shrink-0 ${statusStyle[phase.status]}`}>
                    {statusLabel[phase.status]}
                  </span>
                </div>
                <p className={`text-sm mt-2 ${accentText[phase.color]}`}>
                  {phase.cert}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Technical Background</h2>
        <p className="text-gray-400 text-sm">3+ years MSP experience with:</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-900 border border-gray-700 text-gray-300 text-sm px-3 py-1.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

    </main>
  )
}
