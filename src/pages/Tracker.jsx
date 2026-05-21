import { useState, useEffect } from 'react'
import { phases } from '../data/roadmap'

const colors = {
  green:  { bar: 'bg-green-500',  text: 'text-green-400',  border: 'border-l-green-500' },
  blue:   { bar: 'bg-blue-500',   text: 'text-blue-400',   border: 'border-l-blue-500' },
  yellow: { bar: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-l-yellow-500' },
  red:    { bar: 'bg-red-500',    text: 'text-red-400',    border: 'border-l-red-500' },
  purple: { bar: 'bg-purple-500', text: 'text-purple-400', border: 'border-l-purple-500' },
}

function loadProgress() {
  try { return JSON.parse(localStorage.getItem('soc-progress') || '{}') }
  catch { return {} }
}

function loadLog() {
  try { return JSON.parse(localStorage.getItem('soc-log') || '[]') }
  catch { return [] }
}

export default function Tracker() {
  const [checked, setChecked] = useState(loadProgress)
  const [log, setLog] = useState(loadLog)
  const [logInput, setLogInput] = useState('')

  useEffect(() => {
    localStorage.setItem('soc-progress', JSON.stringify(checked))
  }, [checked])

  useEffect(() => {
    localStorage.setItem('soc-log', JSON.stringify(log))
  }, [log])

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }))

  const addEntry = () => {
    if (!logInput.trim()) return
    const entry = {
      id: Date.now(),
      text: logInput.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    }
    setLog((prev) => [entry, ...prev])
    setLogInput('')
  }

  const deleteEntry = (id) => setLog((prev) => prev.filter((e) => e.id !== id))

  const allTasks = phases.flatMap((p) => p.tasks)
  const totalDone = allTasks.filter((t) => checked[t.id]).length
  const totalPct = Math.round((totalDone / allTasks.length) * 100)

  return (
    <main className="max-w-4xl mx-auto px-6 py-14 space-y-10">

      {/* Header + overall progress */}
      <section className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Progress Tracker</h1>
          <p className="text-gray-400 text-sm mt-1">
            Tick off tasks as you go. Progress saves automatically in your browser.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Overall progress</span>
            <span className="font-mono font-bold text-green-400">{totalPct}%</span>
          </div>
          <div className="bg-gray-800 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${totalPct}%` }}
            />
          </div>
          <p className="text-gray-500 text-xs">{totalDone} of {allTasks.length} tasks complete</p>
        </div>
      </section>

      {/* Phase cards */}
      <section className="space-y-5">
        {phases.map((phase) => {
          const c = colors[phase.color]
          const phaseDone = phase.tasks.filter((t) => checked[t.id]).length
          const phasePct = Math.round((phaseDone / phase.tasks.length) * 100)

          return (
            <div
              key={phase.id}
              className={`bg-gray-900 border border-gray-800 border-l-4 ${c.border} rounded-xl p-5 space-y-4`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-semibold text-white">{phase.name}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">
                    {phase.months} &middot; {phase.duration}
                  </p>
                </div>
                {phasePct === 100 ? (
                  <span className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                    ✓ Complete
                  </span>
                ) : (
                  <span className={`font-mono font-bold text-sm ${c.text}`}>{phasePct}%</span>
                )}
              </div>

              <div className="bg-gray-800 rounded-full h-1.5">
                <div
                  className={`${c.bar} h-1.5 rounded-full transition-all duration-500`}
                  style={{ width: `${phasePct}%` }}
                />
              </div>

              <ul className="space-y-2.5">
                {phase.tasks.map((task) => (
                  <li key={task.id}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={!!checked[task.id]}
                        onChange={() => toggle(task.id)}
                        className="w-4 h-4 rounded accent-green-500 cursor-pointer shrink-0"
                      />
                      {task.link && !checked[task.id] ? (
                        <a
                          href={task.link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-gray-300 hover:text-green-400 underline underline-offset-2 decoration-gray-600 hover:decoration-green-400 transition-colors"
                        >
                          {task.label} ↗
                        </a>
                      ) : (
                        <span
                          className={`text-sm transition-colors ${
                            checked[task.id]
                              ? 'line-through text-gray-600'
                              : 'text-gray-300 group-hover:text-white'
                          }`}
                        >
                          {task.label}
                        </span>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </section>

      {/* Study log */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-white">Study Log</h3>
        <p className="text-gray-500 text-xs">Log each session in one line. Builds evidence for interviews.</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={logInput}
            onChange={(e) => setLogInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addEntry()}
            placeholder="e.g. Completed THM Splunk room, analysed 3 alerts"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
          />
          <button
            onClick={addEntry}
            className="bg-green-500 hover:bg-green-400 transition-colors text-gray-950 font-semibold text-sm px-4 py-2 rounded-lg shrink-0"
          >
            Add
          </button>
        </div>
        {log.length === 0 ? (
          <p className="text-gray-600 text-sm">No entries yet — log your first session above.</p>
        ) : (
          <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {log.map((entry) => (
              <li key={entry.id} className="flex items-start justify-between gap-3 bg-gray-800/60 rounded-lg px-3 py-2">
                <div className="flex gap-3 items-start min-w-0">
                  <span className="text-gray-500 text-xs shrink-0 pt-0.5">{entry.date}</span>
                  <span className="text-gray-300 text-sm break-words">{entry.text}</span>
                </div>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="text-gray-600 hover:text-red-400 transition-colors text-xs shrink-0 pt-0.5"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Weekly schedule reference */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-white">Weekly Schedule</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Weekdays — 2.5 hrs/day</p>
            <ul className="space-y-1.5 text-gray-400">
              <li>4:00–4:30 &mdash; Review previous notes</li>
              <li>4:30–6:30 &mdash; Main study block</li>
              <li>7:00–8:00 &mdash; Hands-on labs</li>
            </ul>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Weekend — 3–4 hrs/day</p>
            <ul className="space-y-1.5 text-gray-400">
              <li>Saturday &mdash; Labs only, no passive video</li>
              <li>Sunday &mdash; Weekly review + next week's plan</li>
            </ul>
          </div>
        </div>
        <p className="text-gray-600 text-xs pt-1">
          One CyberDefenders free challenge per week from month 2 onwards.
        </p>
      </section>

    </main>
  )
}
