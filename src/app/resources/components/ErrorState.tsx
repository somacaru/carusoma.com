'use client';

interface ErrorStateProps {
  error: string;
  message: string;
}

export default function ErrorState({ error, message }: ErrorStateProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        {error}
      </h3>
      <p className="text-red-600 mb-4">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
} 