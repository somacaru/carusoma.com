import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

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

    const feedPromise = parser.parseURL('https://feeds.feedburner.com/TheHackersNews');
    
    const feed = await Promise.race([feedPromise, timeoutPromise]) as any;

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

    return NextResponse.json({ 
      news,
      lastUpdated: new Date().toISOString(),
      status: 'success'
    });
  } catch (error) {
    console.error('Error fetching news:', error);

    // Handle specific error types
    if (error instanceof FeedFetchError) {
      return NextResponse.json(
        { 
          error: 'Failed to fetch news feed',
          message: error.message,
          status: 'error'
        },
        { status: 503 }
      );
    }

    if (error instanceof FeedParseError) {
      return NextResponse.json(
        { 
          error: 'Failed to parse news feed',
          message: error.message,
          status: 'error'
        },
        { status: 422 }
      );
    }

    if (error instanceof Error && error.message === 'Request timeout') {
      return NextResponse.json(
        { 
          error: 'Request timeout',
          message: 'The news feed request took too long to complete',
          status: 'error'
        },
        { status: 504 }
      );
    }

    // Generic error handler
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An unexpected error occurred while fetching news',
        status: 'error'
      },
      { status: 500 }
    );
  }
} 