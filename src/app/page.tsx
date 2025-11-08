import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'Worried about data breaches?',
      description: 'Our comprehensive security solutions protect your sensitive data from unauthorized access.',
      icon: '🔒',
    },
    {
      title: 'Need to comply with regulations?',
      description: 'We help you meet industry standards and regulatory requirements with ease.',
      icon: '📋',
    },
    {
      title: 'Unsure of your network&apos;s vulnerabilities?',
      description: 'Get detailed security assessments and actionable recommendations.',
      icon: '🔍',
    },
    {
      title: 'Seeking proactive protection?',
      description: 'Don&apos;t wait for a breach. Our proactive approach keeps you one step ahead.',
      icon: '🛡️',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Protect Your Business. Secure Your Future.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Don&apos;t wait for a breach. We provide comprehensive security strategies, data protection, and incident response to keep your digital assets safe and your operations secure.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get a Free Security Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-900">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CarusoMA?</h2>
            <p className="text-gray-900 max-w-2xl mx-auto">
              We combine industry expertise with personalized service to deliver security solutions that work for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proactive Approach</h3>
              <p className="text-gray-900">We identify and address vulnerabilities before they become threats.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-900">Certified professionals with years of industry experience.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tailored Solutions</h3>
              <p className="text-gray-900">Custom security strategies that fit your business needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step towards comprehensive cybersecurity protection.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Request a Security Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
