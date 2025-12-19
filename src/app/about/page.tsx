import Image from 'next/image';

const values = [
  {
    title: 'Proactive, not reactive',
    description: 'We identify and address security vulnerabilities before they can be exploited.',
    icon: '🎯',
  },
  {
    title: 'Tailored solutions',
    description: 'We create custom security strategies that align with your business goals and requirements.',
    icon: '⚡',
  },
  {
    title: 'Clear communication',
    description: 'We explain complex security concepts in plain language, ensuring you understand your security posture.',
    icon: '💬',
  },
  {
    title: 'Long-term partnership',
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Why Choose Arcane Digital Shield?
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-blue-100">
              We combine deep expertise with a commitment to excellence to deliver security solutions that work for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Arcane Digital Shield was founded with a clear mission: to help businesses navigate the complex world of cybersecurity with confidence. We understand that every organization faces unique security challenges, and we&apos;re committed to providing tailored solutions that address these specific needs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our team brings together decades of combined experience in cybersecurity, risk management, and compliance. We&apos;ve helped organizations of all sizes strengthen their security posture and protect their valuable assets.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/team.jpg"
                alt="Arcane Digital Shield Team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center border border-gray-100"
              >
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Expertise</h2>
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Our team holds industry-leading certifications and brings extensive experience in cybersecurity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-center border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-900">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto">
            To empower businesses with robust cybersecurity solutions that protect their assets, ensure compliance, and enable growth in an increasingly complex digital landscape.
          </p>
        </div>
      </section>
    </div>
  );
} 