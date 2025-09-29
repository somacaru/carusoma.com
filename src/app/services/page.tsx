import Link from 'next/link';

const services = [
  {
    title: 'Risk Assessment & Vulnerability Management',
    description: 'Identify weaknesses before they become threats.',
    icon: '🔍',
    features: [
      'Network Vulnerability Scans',
      'Security Audits & Gap Analysis',
      'Penetration Testing',
      'Risk Prioritization & Remediation Planning',
    ],
  },
  {
    title: 'Data Protection & Compliance',
    description: 'Safeguard sensitive information and meet regulatory requirements.',
    icon: '🔒',
    features: [
      'Data Encryption Solutions',
      'Backup & Disaster Recovery Planning',
      'Regulatory Compliance (GDPR, HIPAA, PCI-DSS)',
      'Data Loss Prevention (DLP)',
    ],
  },
  {
    title: 'Threat Prevention & Detection',
    description: 'Implement robust defenses and real-time monitoring.',
    icon: '🛡️',
    features: [
      'Firewall & Endpoint Security Configuration',
      'Antivirus/Anti-Malware Solutions',
      'Intrusion Detection/Prevention Systems (IDS/IPS)',
      'Security Information and Event Management (SIEM) Setup',
    ],
  },
  {
    title: 'Incident Response & Recovery',
    description: 'Minimize damage and recover quickly from cyberattacks.',
    icon: '🚨',
    features: [
      'Incident Response Planning',
      'Breach Investigation & Forensics',
      'System Restoration & Hardening',
      'Post-Incident Analysis',
    ],
  },
  {
    title: 'Employee Security Awareness Training',
    description: 'Your weakest link can be your strongest defense. Empower your team.',
    icon: '👥',
    features: [
      'Phishing Simulation & Education',
      'Best Practices for Data Handling',
      'Password Hygiene & MFA Adoption',
      'Security Policy Development',
    ],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Comprehensive Cybersecurity Solutions
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-blue-100">
              We offer a full suite of security services to protect your business from evolving threats and ensure compliance with industry standards.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
              >
                <div className="p-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="text-5xl">{service.icon}</span>
                    </div>
                    <div className="ml-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h2>
                      <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <svg
                              className="h-6 w-6 text-green-500 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-gray-700 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to strengthen your defenses?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Contact us for a personalized security strategy tailored to your business needs.
          </p>
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
} 