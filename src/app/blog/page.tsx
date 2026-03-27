import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';

// This will be replaced with dynamic content from a CMS or markdown files
const blogPosts = [
  {
    id: 1,
    title: 'AI vs. Your Business: How to Spot Deepfake Phishing Attacks',
    excerpt: 'Deepfake technology is being weaponized for social engineering. Learn how to protect your small business from AI-powered phishing attacks.',
    date: 'December 19, 2025',
    readTime: '10 min read',
    category: 'Emerging Threats',
    slug: 'ai-deepfake-phishing-attacks',
    featured: true,
  },
  {
    id: 2,
    title: 'Ransomware 2025: Why Small Businesses Are Prime Targets',
    excerpt: 'Ransomware attacks against small businesses increased 58% in Q2 2025. Discover why you\'re targeted and how to protect your business.',
    date: 'December 12, 2025',
    readTime: '12 min read',
    category: 'Ransomware',
    slug: 'ransomware-2025-small-business-targets',
    featured: true,
  },
  {
    id: 3,
    title: 'Learning from 2025\'s Biggest Breaches: What Small Businesses Need to Know',
    excerpt: 'With 16 billion passwords leaked and major breaches affecting millions, here\'s what small businesses can learn from 2025\'s biggest security incidents.',
    date: 'December 5, 2025',
    readTime: '9 min read',
    category: 'Data Breaches',
    slug: 'biggest-breaches-2025-lessons',
    featured: false,
  },
  {
    id: 4,
    title: 'Cloud Security Misconfigurations: The #1 Data Breach Cause',
    excerpt: 'Cloud misconfigurations are the leading cause of data breaches. Learn the most common mistakes and how to secure your cloud infrastructure.',
    date: 'November 28, 2025',
    readTime: '11 min read',
    category: 'Cloud Security',
    slug: 'cloud-security-misconfigurations',
    featured: false,
  },
  {
    id: 5,
    title: 'Critical Vulnerabilities: Why Patch Management Can\'t Wait',
    excerpt: 'Zero-day exploits like React2Shell demonstrate why timely patching is critical. Learn patch management best practices for small businesses.',
    date: 'November 21, 2025',
    readTime: '8 min read',
    category: 'Vulnerability Management',
    slug: 'patch-management-critical-vulnerabilities',
    featured: false,
  },
  {
    id: 6,
    title: 'AI-Enabled Insider Threats: The New Security Challenge',
    excerpt: 'AI is transforming traditional insider threats into scalable operations. Discover how to protect your business from AI-enhanced insider risks.',
    date: 'November 14, 2025',
    readTime: '10 min read',
    category: 'Insider Threats',
    slug: 'ai-enabled-insider-threats',
    featured: false,
  },
];

const categories = [
  'All Posts',
  'Emerging Threats',
  'Ransomware',
  'Data Breaches',
  'Cloud Security',
  'Vulnerability Management',
];

export default function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-arcane-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-arcane-dark via-arcane-dark/95 to-arcane-dark"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-slate-800/50 border border-cyan-500/30 rounded-full px-5 py-2 mb-8 backdrop-blur">
              <span className="text-cyan-400 text-sm font-medium tracking-wide">WEEKLY SECURITY INSIGHTS</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
              Security <span className="text-cyan-400">Intelligence Blog</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-slate-300">
              Weekly insights on cybersecurity threats, hacker trends, and practical security advice for small to medium businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-white">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-cyan-500/50 transition-all duration-200 overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-center text-sm text-slate-500 mb-3">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                      <span className="mx-2">•</span>
                      <span className="text-cyan-400 font-medium">{post.category}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 leading-tight">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-white hover:text-cyan-400 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-slate-400 mb-6 leading-relaxed">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors inline-flex items-center"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-white">All Posts</h2>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-sm font-medium text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-cyan-500/50 transition-all duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center text-sm text-slate-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-tight">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-white hover:text-cyan-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-slate-400 mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cyan-400 font-medium">
                      {post.category}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg overflow-hidden">
            <div className="px-6 py-12 sm:px-12 lg:px-16 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Get Weekly Security Insights
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Subscribe for the latest cybersecurity threats, hacker trends, and practical security advice — delivered every week.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
