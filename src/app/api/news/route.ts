import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; ArcaneDigitalShieldBot/1.0; +https://arcanedigitalshield.com)',
  },
});

interface FeedItem {
  title?: string;
  link?: string;
  contentSnippet?: string;
  isoDate?: string;
  pubDate?: string;
}

// Custom error types
class FeedFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FeedFetchError';
  }
}

class FeedParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FeedParseError';
  }
}

// Multiple feed sources for better coverage
const feedSources = [
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
  }
];

async function fetchFromSource(source: typeof feedSources[0]): Promise<any[]> {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), 8000);
  });

  for (const url of source.urls) {
    try {
      const feedPromise = parser.parseURL(url);
      const feed = await Promise.race([feedPromise, timeoutPromise]) as any;
      
      if (feed && feed.items && feed.items.length > 0) {
        return feed.items.slice(0, 3).map((item: FeedItem) => ({
          title: item.title,
          excerpt: item.contentSnippet?.slice(0, 150) + '...' || 'No excerpt available',
          date: new Date(item.isoDate || item.pubDate || '').toLocaleDateString(),
          category: source.category,
          source: source.name,
          link: item.link,
        }));
      }
    } catch (error) {
      console.error(`Failed to fetch from ${url}:`, error);
    }
  }
  
  return [];
}

export async function GET() {
  try {
    // Fetch from multiple sources concurrently
    const feedPromises = feedSources.map(source => fetchFromSource(source));
    const feedResults = await Promise.allSettled(feedPromises);
    
    let allNews: any[] = [];
    
    feedResults.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.length > 0) {
        allNews.push(...result.value);
      } else {
        console.warn(`Failed to fetch from ${feedSources[index].name}`);
      }
    });

    // If we got no news from any source, throw an error
    if (allNews.length === 0) {
      throw new FeedParseError('No news items found from any feed source');
    }

    // Sort by date (newest first) and limit to 9 articles
    allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const news = allNews.slice(0, 9);

    return new NextResponse(
      JSON.stringify({ 
        news,
        lastUpdated: new Date().toISOString(),
        status: 'success',
        sourcesCount: feedResults.filter(r => r.status === 'fulfilled').length
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control': 'public, max-age=1800', // Cache for 30 minutes
        },
      }
    );
  } catch (error) {
    console.error('Error fetching news:', error);

    // Handle specific error types
    if (error instanceof FeedFetchError) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Failed to fetch news feed',
          message: error.message,
          status: 'error'
        }),
        {
          status: 503,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    if (error instanceof FeedParseError) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Failed to parse news feed',
          message: error.message,
          status: 'error'
        }),
        {
          status: 422,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    if (error instanceof Error && error.message === 'Request timeout') {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Request timeout',
          message: 'The news feed request took too long to complete',
          status: 'error'
        }),
        {
          status: 504,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    // Generic error handler
    return new NextResponse(
      JSON.stringify({ 
        error: 'Internal server error',
        message: 'An unexpected error occurred while fetching news',
        status: 'error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 