const categories = [
  {
    title: 'Free Learning Platforms',
    color: 'green',
    resources: [
      { name: 'TryHackMe', desc: 'Guided SOC and blue team learning paths. Start with SOC Level 1.', link: 'https://tryhackme.com' },
      { name: 'HackTheBox Academy', desc: 'In-depth modules including Defensive Security Analyst path.', link: 'https://academy.hackthebox.com' },
      { name: 'CyberDefenders', desc: 'Real-world blue team CTF challenges and case investigations.', link: 'https://cyberdefenders.org' },
      { name: 'LetsDefend', desc: 'SOC analyst simulator — triage alerts, investigate incidents.', link: 'https://letsdefend.io' },
      { name: 'Blue Team Labs Online', desc: 'Free challenge-based blue team labs for defenders.', link: 'https://blueteamlabs.online' },
      { name: 'Splunk Free Training', desc: 'Official Splunk fundamentals course. SIEM is core SOC skill.', link: 'https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html' },
    ],
  },
  {
    title: 'Essential Tools',
    color: 'blue',
    resources: [
      { name: 'Wireshark', desc: 'Industry-standard packet analyser. Learn to read network traffic.', link: 'https://www.wireshark.org' },
      { name: 'Autopsy', desc: 'Open-source digital forensics platform used in real investigations.', link: 'https://www.autopsy.com' },
      { name: 'NetworkMiner', desc: 'Passive network sniffer and packet analyser for Windows.', link: 'https://www.netresec.com/?page=NetworkMiner' },
      { name: 'Sysmon', desc: 'Windows system monitoring tool — essential for endpoint detection.', link: 'https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon' },
      { name: 'Velociraptor', desc: 'Open-source DFIR and endpoint monitoring platform.', link: 'https://docs.velociraptor.app' },
      { name: 'CyberChef', desc: 'Browser-based tool for encoding, decoding, and data analysis.', link: 'https://gchq.github.io/CyberChef' },
    ],
  },
  {
    title: 'Reference Frameworks',
    color: 'purple',
    resources: [
      { name: 'MITRE ATT&CK', desc: 'Adversary tactics and techniques knowledge base. Learn this thoroughly.', link: 'https://attack.mitre.org' },
      { name: 'MITRE D3FEND', desc: 'Defensive countermeasures framework — the defender\'s ATT&CK.', link: 'https://d3fend.mitre.org' },
      { name: 'NIST Cybersecurity Framework', desc: 'Industry-standard security framework used by most enterprises.', link: 'https://www.nist.gov/cyberframework' },
      { name: 'SANS Reading Room', desc: 'Free whitepapers and research on every security topic.', link: 'https://www.sans.org/white-papers/' },
      { name: 'CVE Details', desc: 'Searchable database of known vulnerabilities and CVE scores.', link: 'https://www.cvedetails.com' },
    ],
  },
  {
    title: 'Threat Intelligence',
    color: 'red',
    resources: [
      { name: 'VirusTotal', desc: 'Analyse suspicious files, URLs, IPs and domains.', link: 'https://www.virustotal.com' },
      { name: 'Shodan', desc: 'Search engine for internet-connected devices. Learn to use it defensively.', link: 'https://www.shodan.io' },
      { name: 'AbuseIPDB', desc: 'Report and check IP addresses for malicious activity.', link: 'https://www.abuseipdb.com' },
      { name: 'AlienVault OTX', desc: 'Open threat intelligence sharing platform.', link: 'https://otx.alienvault.com' },
      { name: 'URLscan.io', desc: 'Scan and analyse websites for malicious behaviour.', link: 'https://urlscan.io' },
    ],
  },
  {
    title: 'YouTube Channels',
    color: 'yellow',
    resources: [
      { name: 'UnixGuy', desc: 'Non-technical cybersecurity career advice and cert roadmaps.', link: 'https://www.youtube.com/@UnixGuy' },
      { name: 'John Hammond', desc: 'CTF walkthroughs and malware analysis. Excellent for blue team.', link: 'https://www.youtube.com/@_JohnHammond' },
      { name: 'David Bombal', desc: 'Networking fundamentals and cybersecurity career content.', link: 'https://www.youtube.com/@davidbombal' },
      { name: 'Gerald Auger (Simply Cyber)', desc: 'Daily cybersecurity news and GRC career guidance.', link: 'https://www.youtube.com/@SimplyCyber' },
    ],
  },
]

const borderColor = {
  green: 'border-l-green-500',
  blue: 'border-l-blue-500',
  purple: 'border-l-purple-500',
  red: 'border-l-red-500',
  yellow: 'border-l-yellow-500',
}

const headingColor = {
  green: 'text-green-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  red: 'text-red-400',
  yellow: 'text-yellow-400',
}

export default function Resources() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-14 space-y-12">

      <section className="space-y-2">
        <p className="font-mono text-green-400 text-sm">$ ls resources/</p>
        <h1 className="text-3xl font-bold text-white">Resource Library</h1>
        <p className="text-gray-400">
          Free tools, platforms, and references every SOC analyst should know.
        </p>
      </section>

      {categories.map((cat) => (
        <section key={cat.title} className="space-y-4">
          <h2 className={`text-lg font-semibold ${headingColor[cat.color]}`}>{cat.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cat.resources.map((r) => (
              <a
                key={r.name}
                href={r.link}
                target="_blank"
                rel="noreferrer"
                className={`bg-gray-900 border border-gray-800 border-l-4 ${borderColor[cat.color]} rounded-xl p-4 hover:border-gray-600 transition-colors group`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-white text-sm group-hover:text-green-400 transition-colors">
                    {r.name}
                  </h3>
                  <span className="text-gray-600 group-hover:text-green-400 transition-colors text-xs shrink-0 mt-0.5">↗</span>
                </div>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{r.desc}</p>
              </a>
            ))}
          </div>
        </section>
      ))}

    </main>
  )
}
