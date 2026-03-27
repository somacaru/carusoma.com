const values = [
  {
    title: 'AI-Enhanced Security',
    description: 'We leverage cutting-edge AI tools to discover vulnerabilities faster and more comprehensively.',
    icon: '🤖',
  },
  {
    title: 'Proactive, Not Reactive',
    description: 'We identify and address security vulnerabilities before they can be exploited.',
    icon: '🎯',
  },
  {
    title: 'Clear Communication',
    description: 'We explain complex security concepts in plain language, ensuring you understand your security posture.',
    icon: '💬',
  },
  {
    title: 'Long-Term Partnership',
    description: 'We build lasting relationships with our clients, providing ongoing support and guidance.',
    icon: '🤝',
  },
];

const certifications = [
  'Security Analyst Professional Certificate (GPC)',
  'Advanced Python Scripting for Cybersecurity',
  'Cloud Associate (ICCA Certification)',
  'INE Junior Pentester (In Progress)',
];

export default function About() {
  return (
    <div className="min-h-screen bg-arcane-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-arcane-dark via-arcane-dark/95 to-arcane-dark"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-slate-800/50 border border-cyan-500/30 rounded-full px-5 py-2 mb-8 backdrop-blur">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 text-sm font-medium tracking-wide">PHOENIX-BASED • VETERAN-FOUNDED</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
              Why Choose <span className="text-cyan-400">Arcane Digital Shield?</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-slate-300">
              We combine deep expertise with advanced AI security tools to deliver comprehensive protection for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Arcane Digital Shield was founded in Phoenix, Arizona, with a mission to help small and medium businesses protect their digital assets through expert cybersecurity consulting and IT support. We understand that small businesses face unique security challenges and often lack dedicated IT security resources.
              </p>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Our founder combines certified cybersecurity expertise with hands-on technical skills and advanced AI security tools. We bring together Security Analyst certifications with practical experience in network administration, vulnerability research, and IT troubleshooting — allowing us to provide both strategic security consulting and practical implementation.
              </p>
              <p className="text-slate-300 leading-relaxed">
                We specialize in serving small to medium businesses in the Phoenix metropolitan area, providing security audits, cybersecurity consulting, network security configuration, and IT support services tailored to each client&apos;s specific needs and budget.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-8 flex items-center justify-center h-96">
              <div className="text-center">
                <div className="text-6xl mb-4">🛡️</div>
                <p className="text-cyan-400 text-lg font-medium">
                  Phoenix-Based<br />Security Professional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-xl hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-white">{value.title}</h3>
                <p className="text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Certifications & Expertise</h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Industry-recognized certifications backed by a unique combination of cybersecurity expertise and hands-on technical skills.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-lg hover:border-cyan-500/50 transition-all duration-200 text-center"
              >
                <div className="text-cyan-400 text-2xl mb-3">✓</div>
                <h3 className="text-lg font-semibold text-white">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto text-slate-300 leading-relaxed">
            To help small and medium businesses in Phoenix protect their digital assets through expert cybersecurity consulting, security audits, and IT support. We provide practical, affordable security solutions that fit your business needs and budget.
          </p>
        </div>
      </section>
    </div>
  );
}
