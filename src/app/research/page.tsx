import Link from 'next/link';

// Research papers and case studies
const publications = [
  {
    id: 'ads-website-assessment-2026',
    title: 'Security Assessment of a Modern Next.js Web Application',
    subtitle: 'Internal Case Study: ArcaneDigitalShield.com',
    date: 'January 2026',
    type: 'Case Study',
    tags: ['Web Security', 'Next.js', 'Cloud Security', 'API Security'],
    abstract: 'A comprehensive security assessment of a production Next.js application deployed on Google Cloud Run. This self-assessment identified critical misconfigurations in contact form data persistence, missing email notification systems, and opportunities for security hardening. Findings led to implementation of secure cloud storage, encrypted credential management via Secret Manager, and improved data handling practices.',
    findings: {
      critical: 0,
      high: 1,
      medium: 2,
      low: 3,
    },
    status: 'Remediated',
  },
];

// Methodology sections
const methodologies = [
  {
    title: 'AI-Assisted Vulnerability Discovery',
    description: 'We leverage modern AI-powered security tools to augment traditional manual testing, enabling faster and more comprehensive vulnerability discovery.',
    icon: '🤖',
  },
  {
    title: 'Responsible Disclosure',
    description: 'We follow responsible disclosure practices, working with vendors and organizations to remediate vulnerabilities before public disclosure.',
    icon: '🤝',
  },
  {
    title: 'Actionable Reporting',
    description: 'Our reports include proof-of-concept demonstrations, risk assessments, and clear remediation guidance prioritized by severity.',
    icon: '📋',
  },
];

export default function Research() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 rounded-full px-4 py-2 mb-6">
              <span className="text-purple-300 text-sm font-medium">🔬 Security Research</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Research & Case Studies
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-300">
              We believe in transparency and continuous improvement. Here we share our security research, 
              methodologies, and lessons learned from real-world engagements.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combining AI-powered tools with manual expertise for comprehensive security assessments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodologies.map((method, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Publications & Case Studies</h2>
            <p className="text-xl text-gray-600">
              Redacted findings from security assessments and research projects.
            </p>
          </div>
          
          <div className="space-y-8">
            {publications.map((pub) => (
              <article key={pub.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {pub.type}
                    </span>
                    <span className="text-gray-500 text-sm">{pub.date}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      pub.status === 'Remediated' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {pub.status}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{pub.subtitle}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pub.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {pub.abstract}
                  </p>
                  
                  {/* Findings Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Findings Summary</h4>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="text-sm text-gray-600">Critical: {pub.findings.critical}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                        <span className="text-sm text-gray-600">High: {pub.findings.high}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="text-sm text-gray-600">Medium: {pub.findings.medium}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="text-sm text-gray-600">Low: {pub.findings.low}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href={`/research/${pub.id}`}
                    className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                  >
                    Read Full Report →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">More Research Coming</h3>
                <p className="text-gray-600">
                  We&apos;re actively conducting security research and will publish findings as engagements are completed and disclosed.
                </p>
              </div>
              <Link
                href="/contact"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap"
              >
                Request an Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure Policy */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Responsible Disclosure</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <p className="text-gray-700 mb-6 leading-relaxed">
                We follow responsible disclosure practices in all our security research. For client engagements, 
                we only publish case studies with explicit written permission, and all sensitive details are redacted.
              </p>
              <h4 className="font-bold text-gray-900 mb-3">Our Disclosure Timeline</h4>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="bg-purple-100 text-purple-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <span>Discovery and documentation of vulnerability</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-purple-100 text-purple-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <span>Private disclosure to affected party with full technical details</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-purple-100 text-purple-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <span>Collaboration on remediation and verification of fix</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-purple-100 text-purple-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <span>Coordinated public disclosure (if applicable) after remediation</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want Your Systems Assessed?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get the same rigorous security assessment methodology applied to your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200"
            >
              Schedule Assessment
            </Link>
            <Link
              href="/services#advanced"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
