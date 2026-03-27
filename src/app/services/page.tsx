import Link from 'next/link';

// Service categories
const serviceCategories = [
  {
    id: 'it-support',
    name: 'IT Support',
    icon: '🔧',
  },
  {
    id: 'security',
    name: 'Security',
    icon: '🛡️',
  },
  {
    id: 'advanced',
    name: 'Offensive',
    icon: '⚔️',
  },
  {
    id: 'compliance',
    name: 'Compliance',
    icon: '📋',
  },
];

const services = {
  'it-support': [
    {
      title: 'Computer Repair & Maintenance',
      description: 'Diagnose and fix hardware and software issues. Speed up slow computers, resolve crashes, keep systems running.',
      icon: '💻',
      price: 'From $50/hr',
      features: [
        'Hardware diagnostics & repair',
        'Software troubleshooting',
        'Performance optimization',
        'OS reinstalls & upgrades',
      ],
    },
    {
      title: 'Virus & Malware Removal',
      description: 'Complete removal of viruses, ransomware, spyware. Clean your system and prevent future infections.',
      icon: '🦠',
      price: 'From $75',
      features: [
        'Full system malware scan',
        'Ransomware removal',
        'Security software setup',
        'Prevention training',
      ],
    },
    {
      title: 'Data Backup & Recovery',
      description: 'Recover lost files from failing drives. Set up bulletproof backup systems.',
      icon: '💾',
      price: 'From $100',
      features: [
        'Data recovery services',
        'Cloud backup setup',
        'Disaster recovery planning',
        'Automated backups',
      ],
    },
    {
      title: 'Network Setup & Support',
      description: 'Home and business network setup, troubleshooting, optimization.',
      icon: '📡',
      price: 'From $75/hr',
      features: [
        'Wi-Fi optimization',
        'Router configuration',
        'Network troubleshooting',
        'Security hardening',
      ],
    },
  ],
  'security': [
    {
      title: 'AI-Powered Security Audits',
      description: 'Comprehensive assessments using AI-enhanced scanning. Find vulnerabilities before attackers do.',
      icon: '🤖',
      price: '$200-500',
      features: [
        'AI vulnerability scanning',
        'Network assessment',
        'Device security audit',
        'Detailed remediation report',
      ],
    },
    {
      title: 'Network Security Hardening',
      description: 'Configure firewalls, VPNs, and security infrastructure to protect your business.',
      icon: '🔒',
      price: 'Project-based',
      features: [
        'Firewall configuration',
        'VPN setup',
        'Network segmentation',
        'Access controls',
      ],
    },
    {
      title: '24/7 Threat Monitoring',
      description: 'Continuous AI-powered monitoring. We watch your systems so you can sleep.',
      icon: '👁️',
      price: 'Monthly retainer',
      features: [
        'Real-time monitoring',
        'Anomaly detection',
        'Instant alerts',
        'Monthly reports',
      ],
    },
  ],
  'advanced': [
    {
      title: 'Penetration Testing',
      description: 'Authorized simulated attacks on your systems. Find weaknesses before hackers do.',
      icon: '🎯',
      price: 'From $500',
      badge: 'Offensive',
      features: [
        'External/internal testing',
        'Web app testing',
        'API security testing',
        'Detailed PoC report',
      ],
    },
    {
      title: 'Incident Response',
      description: 'Breach in progress? We shut it down. Contain, investigate, recover.',
      icon: '🚨',
      price: 'Emergency rates',
      badge: 'Defensive',
      features: [
        '24/7 emergency response',
        'Threat containment',
        'Forensic investigation',
        'Recovery assistance',
      ],
    },
    {
      title: 'Vulnerability Research',
      description: 'Deep security research to discover unknown vulnerabilities. Custom exploit development.',
      icon: '🔬',
      price: 'Custom',
      badge: 'Research',
      features: [
        'Zero-day research',
        'Exploit development',
        'Bug bounty support',
        'Published case studies',
      ],
    },
    {
      title: 'Red Team Operations',
      description: 'Full adversary simulation. Test your detection and response capabilities.',
      icon: '⚔️',
      price: 'Custom',
      badge: 'Adversary Sim',
      features: [
        'Multi-vector attacks',
        'Social engineering',
        'Physical security tests',
        'Executive debrief',
      ],
    },
  ],
  'compliance': [
    {
      title: 'SOC 2 Compliance',
      description: 'Get audit-ready with our compliance roadmap. We guide you through every control.',
      icon: '📋',
      price: 'Project-based',
      badge: 'Type I & II',
      features: [
        'Gap analysis',
        'Policy development',
        'Control implementation',
        'Evidence collection',
        'Auditor coordination',
        'Certification support',
      ],
    },
    {
      title: 'Security Policy Development',
      description: 'Comprehensive security policies tailored to your organization.',
      icon: '📝',
      price: 'Project-based',
      features: [
        'Acceptable use policies',
        'Password policies',
        'Incident response plans',
        'Data protection policies',
      ],
    },
    {
      title: 'Compliance Consulting',
      description: 'Navigate regulatory requirements. HIPAA, PCI-DSS, GDPR guidance.',
      icon: '⚖️',
      price: '$150/hr',
      features: [
        'Regulatory assessment',
        'Gap remediation',
        'Documentation',
        'Audit preparation',
      ],
    },
  ],
};

export default function Services() {
  return (
    <div className="min-h-screen bg-arcane-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <span className="text-cyan-400 text-sm font-medium">Full-Spectrum Capabilities</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">From IT Support</span>
              <br />
              <span className="text-cyan-400">to Red Team Operations</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Whatever your security needs, we&apos;ve got you covered. AI-powered tools. Certified expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-slate-900/50 border-b border-slate-800 sticky top-16 z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 gap-2">
            {serviceCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-cyan-500/50 rounded-lg whitespace-nowrap transition-all"
              >
                <span>{category.icon}</span>
                <span className="text-slate-300 text-sm font-medium">{category.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* IT Support Services */}
      <section id="it-support" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="text-cyan-400 text-sm font-semibold tracking-wider mb-2">{'//'} IT SUPPORT</div>
            <h2 className="text-3xl font-bold text-white">Computer Repair & IT Support</h2>
            <p className="text-slate-400 mt-2">Fast fixes for everyday tech problems.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services['it-support'].map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Security Services */}
      <section id="security" className="py-16 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="text-cyan-400 text-sm font-semibold tracking-wider mb-2">{'//'} SECURITY</div>
            <h2 className="text-3xl font-bold text-white">Security Services</h2>
            <p className="text-slate-400 mt-2">AI-powered protection for your digital assets.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services['security'].map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Security */}
      <section id="advanced" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="text-red-400 text-sm font-semibold tracking-wider mb-2">{'//'} OFFENSIVE SECURITY</div>
            <h2 className="text-3xl font-bold text-white">Advanced Security Operations</h2>
            <p className="text-slate-400 mt-2">Enterprise-grade offensive and defensive capabilities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services['advanced'].map((service, index) => (
              <ServiceCard key={index} service={service} dark />
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section id="compliance" className="py-16 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="text-emerald-400 text-sm font-semibold tracking-wider mb-2">{'//'} COMPLIANCE</div>
            <h2 className="text-3xl font-bold text-white">Compliance & Governance</h2>
            <p className="text-slate-400 mt-2">Get audit-ready. Stay compliant.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services['compliance'].map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-cyan-400 text-sm font-semibold tracking-wider mb-4">{'//'} GET STARTED</div>
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Protected?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Free consultation. We&apos;ll assess your needs and provide a clear quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-cyan-500 text-slate-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-cyan-400 transition-all"
            >
              Book Consultation
            </Link>
            <Link
              href="tel:+14807885419"
              className="bg-transparent border-2 border-slate-600 text-slate-300 px-8 py-4 rounded-lg text-lg font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-all"
            >
              📞 (480) 788-5419
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Service Card Component
function ServiceCard({ service, dark }: { service: { title: string; description: string; icon: string; price: string; features: string[]; badge?: string }; dark?: boolean }) {
  return (
    <div className={`${dark ? 'bg-slate-800/30 border-red-500/20 hover:border-red-500/50' : 'bg-slate-800/30 border-slate-700/50 hover:border-cyan-500/50'} backdrop-blur border p-6 rounded-xl transition-all duration-300 h-full flex flex-col group`}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{service.icon}</span>
        <div className="flex flex-col items-end gap-1">
          {service.badge && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${dark ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
              {service.badge}
            </span>
          )}
          <span className="text-sm font-semibold text-cyan-400">{service.price}</span>
        </div>
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
      <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-grow">{service.description}</p>
      <ul className="space-y-1">
        {service.features.slice(0, 4).map((feature, index) => (
          <li key={index} className="flex items-center text-xs text-slate-500">
            <span className="text-emerald-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
