import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; CarusomaBot/1.0; +https://carusoma.com)',
  },
});

interface FeedItem {
  title?: string;
  link?: string;
  contentSnippet?: string;
  isoDate?: string;
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

export async function GET() {
  try {
    // Implement timeout using Promise.race
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 5000);
    });

    // Try alternative feed URL if the main one fails
    const feedUrls = [
      'https://feeds.feedburner.com/TheHackersNews',
      'https://thehackernews.com/feeds/posts/default',
      'https://thehackernews.com/feeds/posts/default?alt=rss'
    ];

    let feed = null;
    let lastError = null;

    for (const url of feedUrls) {
      try {
        const feedPromise = parser.parseURL(url);
        feed = await Promise.race([feedPromise, timeoutPromise]) as any;
        if (feed && feed.items && feed.items.length > 0) {
          break;
        }
      } catch (error) {
        console.error(`Failed to fetch from ${url}:`, error);
        lastError = error;
      }
    }

    if (!feed || !feed.items || feed.items.length === 0) {
      throw new FeedParseError('No news items found in the feed');
    }

    // Transform the feed items into our desired format
    const news = feed.items.slice(0, 6).map((item: FeedItem) => {
      if (!item.title || !item.link) {
        throw new FeedParseError('Invalid feed item format');
      }

      return {
        title: item.title,
        excerpt: item.contentSnippet?.slice(0, 150) + '...' || 'No excerpt available',
        date: new Date(item.isoDate || '').toLocaleDateString(),
        category: 'Security News',
        source: 'The Hacker News',
        link: item.link,
      };
    });

    return new NextResponse(
      JSON.stringify({ 
        news,
        lastUpdated: new Date().toISOString(),
        status: 'success'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
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