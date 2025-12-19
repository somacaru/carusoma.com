import { NextRequest, NextResponse } from 'next/server';
import { readSubmissions, writeSubmissions } from './storage';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  submittedAt: string;
  read: boolean;
}

// POST - Handle form submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, phone, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create submission
    const submission: ContactSubmission = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || '',
      phone: phone?.trim() || '',
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      read: false,
    };

    // Read existing submissions
    const submissions = await readSubmissions();
    
    // Add new submission
    submissions.unshift(submission);
    
    // Keep only last 1000 submissions to prevent file from growing too large
    const limitedSubmissions = submissions.slice(0, 1000);
    
    // Write to file
    await writeSubmissions(limitedSubmissions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon!',
        id: submission.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET - Retrieve submissions (for admin page)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    
    let submissions = await readSubmissions();
    
    if (unreadOnly) {
      submissions = submissions.filter(s => !s.read);
    }
    
    // Sort by most recent first
    submissions.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    return NextResponse.json(
      { 
        submissions,
        count: submissions.length,
        unreadCount: submissions.filter(s => !s.read).length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving submissions:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve submissions' },
      { status: 500 }
    );
  }
}

// PATCH - Mark submission as read/unread
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, read } = body;

    if (!id || typeof read !== 'boolean') {
      return NextResponse.json(
        { error: 'ID and read status are required' },
        { status: 400 }
      );
    }

    const submissions = await readSubmissions();
    const submission = submissions.find(s => s.id === id);

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    submission.read = read;
    await writeSubmissions(submissions);

    return NextResponse.json(
      { success: true, submission },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}
