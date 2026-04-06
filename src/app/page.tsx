import Link from 'next/link';

export default function Home() {
  const services = [
    {
      title: 'Threat Detection & Response',
      description: 'AI-powered monitoring that catches attackers before they reach your data. 24/7 vigilance.',
      icon: '👁️',
      status: 'active',
    },
    {
      title: 'Penetration Testing',
      description: 'We attack your systems like hackers would - then show you exactly how to stop them.',
      icon: '🎯',
      status: 'active',
    },
    {
      title: 'SOC 2 Compliance',
      description: 'Get audit-ready with our compliance roadmap. We guide you through every control.',
      icon: '📋',
      status: 'active',
    },
    {
      title: 'Incident Response',
      description: 'Breach in progress? We shut it down fast. Contain, investigate, recover.',
      icon: '🚨',
      status: 'active',
    },
  ];

  const stats = [
    { value: '24/7', label: 'Monitoring', icon: '👁️' },
    { value: '<15min', label: 'Response Time', icon: '⚡' },
    { value: '100%', label: 'Threat Visibility', icon: '🔍' },
  ];

  return (
    <div className="min-h-screen bg-arcane-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid opacity-50"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-arcane-dark via-arcane-dark/95 to-arcane-dark"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-3 bg-slate-800/50 border border-cyan-500/30 rounded-full px-5 py-2 mb-8 backdrop-blur">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 text-sm font-medium tracking-wide">SYSTEMS ACTIVE • PHOENIX, AZ</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Small-Business Security.</span>
              <br />
              <span className="text-cyan-400 text-glow-cyan">Try-Hard By Design.</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto text-slate-300">
              Commercial-grade coverage for teams that need results, not theater—monitoring, testing, and response with red-team discipline.
            </p>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-slate-400">
              When something hits the wire, <span className="text-cyan-400 font-semibold">we contain it and document the fix. Fast.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/book"
                className="bg-cyan-500 text-slate-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Get Protected
              </Link>
              <Link
                href="/services"
                className="bg-transparent border-2 border-cyan-500/50 text-cyan-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-200"
              >
                View Capabilities
              </Link>
            </div>

            {/* Live stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visibility / SOC-style section */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-cyan-400 text-sm font-semibold tracking-wider mb-4">{'//'} TOTAL VISIBILITY</div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Your Security Operations Center.<br />
                <span className="text-cyan-400">Without the SOC Price Tag.</span>
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Enterprise companies pay millions for security operations centers. We bring that same 
                level of vigilance to small businesses using AI-powered tools that work around the clock.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400 text-xl">👁️</span>
                  <span className="text-slate-300">Real-time threat monitoring</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400 text-xl">✓</span>
                  <span className="text-slate-300">AI-powered anomaly detection</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400 text-xl">✓</span>
                  <span className="text-slate-300">Instant alerts when threats appear</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400 text-xl">✓</span>
                  <span className="text-slate-300">Rapid response and containment</span>
                </li>
              </ul>
            </div>
            
            {/* Terminal-style monitoring display */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-slate-500 text-sm ml-2 font-mono">threat_monitor.sys</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">●</span>
                  <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-slate-300">Network scan complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">●</span>
                  <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-slate-300">23 endpoints monitored</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">●</span>
                  <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-cyan-400">AI analysis: No anomalies detected</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">●</span>
                  <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-emerald-400">Status: ALL SYSTEMS SECURE</span>
                </div>
                <div className="pt-2 border-t border-slate-800 mt-4">
                  <span className="text-slate-600">$</span>
                  <span className="text-cyan-400 ml-2">_</span>
                  <span className="animate-pulse text-cyan-400">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-cyan-400 text-sm font-semibold tracking-wider mb-4">{'//'} CAPABILITIES</div>
            <h2 className="text-4xl font-bold text-white mb-4">Full-Spectrum Security</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From compliance to incident response - we cover every angle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-slate-800/30 backdrop-blur border border-slate-700/50 p-6 rounded-xl hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{service.icon}</span>
                  <span className="flex items-center gap-1 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-emerald-400 uppercase tracking-wider">Active</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* SOC 2 Compliance Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900/50 to-arcane-dark border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">SOC 2 Compliance Roadmap</h3>
                <div className="space-y-4">
                  {[
                    { phase: 'Assessment', status: 'complete', desc: 'Gap analysis & scope definition' },
                    { phase: 'Remediation', status: 'complete', desc: 'Policy development & control implementation' },
                    { phase: 'Evidence Collection', status: 'active', desc: 'Documentation & audit preparation' },
                    { phase: 'Audit Support', status: 'pending', desc: 'Auditor coordination & response' },
                    { phase: 'Certification', status: 'pending', desc: 'SOC 2 Type I/II report issued' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        item.status === 'complete' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' :
                        item.status === 'active' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 animate-pulse' :
                        'bg-slate-700/50 text-slate-500 border border-slate-600'
                      }`}>
                        {item.status === 'complete' ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{item.phase}</div>
                        <div className="text-slate-500 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="text-cyan-400 text-sm font-semibold tracking-wider mb-4">{'//'} COMPLIANCE</div>
              <h2 className="text-4xl font-bold text-white mb-6">
                SOC 2 Ready.<br />
                <span className="text-cyan-400">Audit Confident.</span>
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Enterprise clients and partners increasingly require SOC 2 compliance. We guide you through 
                every control, policy, and evidence requirement - so you pass your audit the first time.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-cyan-400">→</span>
                  Trust Services Criteria mapping
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-cyan-400">→</span>
                  Policy & procedure development
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-cyan-400">→</span>
                  Evidence collection & organization
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-cyan-400">→</span>
                  Auditor liaison & support
                </li>
              </ul>
              <Link
                href="/services#compliance"
                className="inline-flex items-center text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
              >
                Learn About Compliance Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-cyan-400 text-sm font-semibold tracking-wider mb-4">{'//'} CREDENTIALS</div>
            <h2 className="text-3xl font-bold text-white">Certified. Proven. Ready.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-cyan-400 text-2xl mb-2">🎓</div>
              <div className="text-white font-semibold">Security Analyst</div>
              <div className="text-slate-500 text-sm">GPC Certified</div>
            </div>
            <div>
              <div className="text-cyan-400 text-2xl mb-2">☁️</div>
              <div className="text-white font-semibold">Cloud Security</div>
              <div className="text-slate-500 text-sm">ICCA Certified</div>
            </div>
            <div>
              <div className="text-cyan-400 text-2xl mb-2">🐍</div>
              <div className="text-white font-semibold">Python Security</div>
              <div className="text-slate-500 text-sm">Advanced Certified</div>
            </div>
            <div>
              <div className="text-cyan-400 text-2xl mb-2">🔓</div>
              <div className="text-white font-semibold">Penetration Testing</div>
              <div className="text-slate-500 text-sm">eJPT (In Progress)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-8 bg-red-500/10 border-y border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🚨</span>
              <div>
                <h3 className="font-bold text-red-400 text-lg">Active Breach?</h3>
                <p className="text-red-300/80">Emergency incident response available 24/7</p>
              </div>
            </div>
            <Link
              href="tel:+14807885419"
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-400 transition-colors whitespace-nowrap"
            >
              📞 Emergency: (480) 788-5419
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-cyan-400 text-sm font-semibold tracking-wider mb-4">{'//'} GET STARTED</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Harden Your Stack?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Free security consultation. We&apos;ll assess your attack surface and show you exactly where you&apos;re vulnerable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-cyan-500 text-slate-900 px-10 py-4 rounded-lg text-lg font-bold hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
            >
              Book Security Assessment
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-slate-600 text-slate-300 px-10 py-4 rounded-lg text-lg font-semibold hover:border-slate-500 hover:text-white transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
          <p className="mt-8 text-slate-600 text-sm">
            Serving Phoenix • Scottsdale • Tempe • Chandler • Mesa • Gilbert
          </p>
        </div>
      </section>
    </div>
  );
}
