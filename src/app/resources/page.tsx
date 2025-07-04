import Link from 'next/link';
import ErrorState from './components/ErrorState';
import { headers } from 'next/headers';

const blogPosts = [
  {
    title: 'AI-Powered Cyberattacks: The New Frontier of 2025',
    excerpt: 'How artificial intelligence is being weaponized by cybercriminals and what businesses need to know to stay protected.',
    date: 'June 28, 2025',
    readTime: '8 min read',
    category: 'Emerging Threats',
  },
  {
    title: 'Zero Trust Architecture: Is Your Business Ready?',
    excerpt: 'A comprehensive guide to implementing Zero Trust security models in small to medium businesses.',
    date: 'June 20, 2025',
    readTime: '12 min read',
    category: 'Security Architecture',
  },
  {
    title: 'Ransomware Evolution: RaaS and Triple Extortion Tactics',
    excerpt: 'Understanding the latest ransomware trends including Ransomware-as-a-Service and multi-stage extortion methods.',
    date: 'June 15, 2025',
    readTime: '10 min read',
    category: 'Ransomware',
  },
  {
    title: 'Supply Chain Security: Protecting Your Third-Party Risks',
    excerpt: 'How to assess and mitigate cybersecurity risks from vendors, contractors, and supply chain partners.',
    date: 'June 8, 2025',
    readTime: '9 min read',
    category: 'Risk Management',
  },
  {
    title: 'Cloud Security Misconfiguration: The #1 Data Breach Cause',
    excerpt: 'Common cloud security mistakes and a checklist to ensure your cloud infrastructure is properly secured.',
    date: 'May 30, 2025',
    readTime: '7 min read',
    category: 'Cloud Security',
  },
  {
    title: 'Phishing 2025: Deepfakes and AI-Generated Social Engineering',
    excerpt: 'The evolution of phishing attacks using deepfake technology and AI-generated content to fool employees.',
    date: 'May 22, 2025',
    readTime: '6 min read',
    category: 'Social Engineering',
  },
  {
    title: 'Incident Response Plan: Your 90-Day Implementation Guide',
    excerpt: 'Step-by-step guide to building a comprehensive incident response plan that actually works when you need it.',
    date: 'May 15, 2025',
    readTime: '15 min read',
    category: 'Incident Response',
  },
  {
    title: 'Remote Work Security: Beyond VPNs in 2025',
    excerpt: 'Modern approaches to securing remote workforces including SASE, endpoint detection, and behavioral analytics.',
    date: 'May 8, 2025',
    readTime: '11 min read',
    category: 'Remote Security',
  },
  {
    title: 'Compliance Automation: SOC 2, ISO 27001, and GDPR Made Simple',
    excerpt: 'How to streamline compliance processes and reduce the burden of security certifications.',
    date: 'April 25, 2025',
    readTime: '13 min read',
    category: 'Compliance',
  },
  {
    title: 'Employee Security Training That Actually Works',
    excerpt: 'Evidence-based approaches to security awareness training that change behavior, not just tick boxes.',
    date: 'April 18, 2025',
    readTime: '8 min read',
    category: 'Security Training',
  },
  {
    title: 'Budget-Friendly Security: Small Business Essentials',
    excerpt: 'Essential cybersecurity measures that don\'t break the bank - a practical guide for small business owners.',
    date: 'May 28, 2025',
    readTime: '10 min read',
    category: 'Budget Security',
  },
  {
    title: 'Dark Web Monitoring: Should Your Business Be Concerned?',
    excerpt: 'Understanding dark web threats, monitoring services, and when they make sense for your business.',
    date: 'April 3, 2025',
    readTime: '7 min read',
    category: 'Threat Intelligence',
  },
];

const categories = [
  'Emerging Threats',
  'Security Architecture', 
  'Ransomware',
  'Risk Management',
  'Cloud Security',
  'Social Engineering',
  'Incident Response',
  'Remote Security',
  'Compliance',
  'Security Training',
  'Budget Security',
  'Threat Intelligence',
  'Network Security',
  'Authentication',
  'Data Protection',
  'Best Practices',
];

interface NewsItem {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  source: string;
  link: string;
}

interface NewsResponse {
  news: NewsItem[];
  lastUpdated?: string;
  status: 'success' | 'error';
  error?: string;
  message?: string;
}

async function getNews(): Promise<NewsResponse> {
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const res = await fetch(`${protocol}://${host}/api/news`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        news: [],
        status: 'error',
        error: errorData.error || 'Failed to fetch news',
        message: errorData.message || 'An error occurred while fetching news'
      };
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      news: [],
      status: 'error',
      error: 'Network Error',
      message: 'Failed to connect to the news service'
    };
  }
}
export default async function Resources() {
  const newsData = await getNews();

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

      {/* Latest Security News Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-blue-500">
            <h2 className="text-3xl font-bold">Latest Security News</h2>
            {newsData.lastUpdated && (
              <span className="text-sm text-gray-900">
                Last updated: {new Date(newsData.lastUpdated).toLocaleTimeString()}
              </span>
            )}
          </div>

          {newsData.status === 'error' ? (
            <ErrorState error={newsData.error || 'Error'} message={newsData.message || 'An error occurred'} />
          ) : newsData.news.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-900">No news articles available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsData.news.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-blue-600 font-medium">{item.category}</span>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-900 mb-4">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Source: {item.source}</span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                          href={`/resources/${post.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')}`}
                          className="text-gray-900 hover:text-blue-600"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-900 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-600 font-medium">
                          {post.category}
                        </span>
                        <Link
                          href={`/resources/${post.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')}`}
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