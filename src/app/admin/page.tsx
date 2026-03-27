'use client';

import { useState, useEffect } from 'react';

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

const fetchOpts = { credentials: 'include' as RequestCredentials };

export default function Admin() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetch('/api/auth/session', fetchOpts)
      .then((res) => {
        setAuthenticated(res.ok);
      })
      .catch(() => setAuthenticated(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
      credentials: 'include',
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setAuthenticated(true);
      setPassword('');
    } else {
      setLoginError(data.error || 'Login failed');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setAuthenticated(false);
    setSubmissions([]);
  };

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = showUnreadOnly ? '/api/contact?unreadOnly=true' : '/api/contact';
      const response = await fetch(url, fetchOpts);
      
      if (!response.ok) {
        if (response.status === 401) {
          setAuthenticated(false);
          return;
        }
        throw new Error('Failed to fetch submissions');
      }
      
      const data = await response.json();
      setSubmissions(data.submissions || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated === true) fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, showUnreadOnly]);

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
      try {
      const response = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: !currentStatus }),
        credentials: 'include',
      });

      if (response.ok) {
        // Update local state
        setSubmissions(prev =>
          prev.map(sub =>
            sub.id === id ? { ...sub, read: !currentStatus } : sub
          )
        );
        // Refresh unread count
        fetchSubmissions();
      }
    } catch (err) {
      console.error('Error updating read status:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600 text-sm mb-6">Sign in to view contact submissions</p>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Admin password"
            autoComplete="current-password"
            required
          />
          {loginError && (
            <p className="mt-2 text-sm text-red-600">{loginError}</p>
          )}
          <button
            type="submit"
            className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Contact Submissions</h1>
              <p className="text-white">Manage and review customer inquiries</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold">{unreadCount}</div>
                <div className="text-sm text-white">Unread Messages</div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Show unread only
              </span>
            </label>
            <button
              onClick={fetchSubmissions}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>

      {/* Submissions List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading submissions...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800 font-medium mb-2">Error</p>
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchSubmissions}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : submissions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg">
                {showUnreadOnly
                  ? 'No unread submissions'
                  : 'No submissions yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                    submission.read
                      ? 'border-gray-300'
                      : 'border-blue-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {submission.name}
                        </h3>
                        {!submission.read && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <a
                          href={`mailto:${submission.email}`}
                          className="hover:text-blue-600 hover:underline"
                        >
                          📧 {submission.email}
                        </a>
                        {submission.phone && (
                          <a
                            href={`tel:${submission.phone}`}
                            className="hover:text-blue-600 hover:underline"
                          >
                            📞 {submission.phone}
                          </a>
                        )}
                        {submission.company && (
                          <span>🏢 {submission.company}</span>
                        )}
                        <span>🕒 {formatDate(submission.submittedAt)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleReadStatus(submission.id, submission.read)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        submission.read
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {submission.read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {submission.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
