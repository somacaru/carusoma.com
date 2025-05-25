import Link from 'next/link';

const blogPosts = [
  {
    title: 'Top 5 Cybersecurity Threats for Small Businesses',
    excerpt: 'Learn about the most common security threats facing small businesses today and how to protect against them.',
    date: 'March 15, 2024',
    readTime: '5 min read',
    category: 'Security Threats',
  },
  {
    title: 'Understanding Ransomware: What Every Business Owner Needs to Know',
    excerpt: 'A comprehensive guide to ransomware attacks, their impact, and effective prevention strategies.',
    date: 'March 10, 2024',
    readTime: '7 min read',
    category: 'Ransomware',
  },
  {
    title: 'Is Your Wi-Fi Network Secure? A Quick Checklist',
    excerpt: 'Essential steps to ensure your business Wi-Fi network is properly secured against unauthorized access.',
    date: 'March 5, 2024',
    readTime: '4 min read',
    category: 'Network Security',
  },
  {
    title: 'The Importance of Multi-Factor Authentication (MFA)',
    excerpt: 'Why MFA is crucial for business security and how to implement it effectively.',
    date: 'February 28, 2024',
    readTime: '6 min read',
    category: 'Authentication',
  },
  {
    title: 'What to Do Immediately After a Suspected Phishing Attack',
    excerpt: 'Step-by-step guide for responding to and mitigating the impact of phishing attacks.',
    date: 'February 20, 2024',
    readTime: '5 min read',
    category: 'Incident Response',
  },
  {
    title: 'Choosing the Right Backup Solution for Your Business',
    excerpt: 'A detailed comparison of backup solutions and best practices for data protection.',
    date: 'February 15, 2024',
    readTime: '8 min read',
    category: 'Data Protection',
  },
];

const categories = [
  'Security Threats',
  'Ransomware',
  'Network Security',
  'Authentication',
  'Incident Response',
  'Data Protection',
  'Compliance',
  'Best Practices',
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Security Resources & Insights
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Stay informed about the latest cybersecurity trends, threats, and best practices to protect your business.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        href={`/resources/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <article
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="text-xl font-bold mb-2">
                        <Link
                          href={`/resources/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-gray-900 hover:text-blue-600"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-600 font-medium">
                          {post.category}
                        </span>
                        <Link
                          href={`/resources/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 lg:px-16">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Stay Updated on Security
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Subscribe to our newsletter for the latest security insights and updates.
                </p>
                <form className="max-w-md mx-auto">
                  <div className="flex gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 