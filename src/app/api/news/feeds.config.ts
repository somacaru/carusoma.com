/**
 * RSS Feed Sources Configuration
 * 
 * Add new security news sources here. Focus on:
 * - Attack coverage and groundbreaking code analysis
 * - New techniques and clever discoveries in vulnerability research
 * - Cutting-edge security research
 * - Advanced threat intelligence
 * 
 * Format:
 * {
 *   urls: ['primary-url', 'backup-url'],  // Try multiple URLs if available
 *   name: 'Source Name',
 *   category: 'Category Name'
 * }
 */

export interface FeedSource {
  urls: string[];
  name: string;
  category: string;
}

// Standard security news sources
export const standardFeeds: FeedSource[] = [
  {
    urls: [
      'https://feeds.feedburner.com/TheHackersNews',
      'https://thehackernews.com/feeds/posts/default',
      'https://thehackernews.com/feeds/posts/default?alt=rss'
    ],
    name: 'The Hacker News',
    category: 'Security News'
  },
  {
    urls: [
      'https://krebsonsecurity.com/feed/',
      'https://feeds.feedburner.com/KrebsOnSecurity'
    ],
    name: 'Krebs on Security',
    category: 'Security Research'
  },
  {
    urls: [
      'https://www.bleepingcomputer.com/feed/',
      'https://feeds.feedburner.com/bleepingcomputer'
    ],
    name: 'BleepingComputer',
    category: 'Security Updates'
  },
  {
    urls: [
      'https://threatpost.com/feed/',
      'https://feeds.feedburner.com/threatpost'
    ],
    name: 'Threatpost',
    category: 'Threat Intelligence'
  },
  {
    urls: [
      'https://www.darkreading.com/rss.xml',
      'https://www.darkreading.com/rss_simple.asp'
    ],
    name: 'Dark Reading',
    category: 'Security Analysis'
  },
  {
    urls: [
      'https://www.securityweek.com/feed',
      'https://feeds.feedburner.com/Securityweek'
    ],
    name: 'SecurityWeek',
    category: 'Security News'
  },
  {
    urls: [
      'https://www.csoonline.com/index.rss'
    ],
    name: 'CSO Online',
    category: 'Security Strategy'
  }
];

// Custom feeds for advanced coverage
// Add sources here that focus on:
// - Attack coverage and code analysis
// - Vulnerability research discoveries
// - Advanced techniques and exploits
export const customFeeds: FeedSource[] = [
  {
    urls: [
      'https://abnormal.ai/blog/feed',
      'https://abnormal.ai/feed',
      'https://abnormal.ai/blog/rss'
    ],
    name: 'Abnormal Security',
    category: 'Attack Coverage'
  },
];

// Combine all feeds
export const allFeeds: FeedSource[] = [
  ...standardFeeds,
  ...customFeeds
];

