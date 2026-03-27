import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-arcane-dark flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-lg">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/404-logo.png"
            alt="Arcane Digital Shield"
            width={220}
            height={220}
            className="pixel-crisp"
            priority
          />
        </div>

        {/* Terminal header */}
        <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-red-400 text-sm font-medium tracking-wide">SIGNAL LOST • ERROR 404</span>
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-bold text-white mb-2 leading-none">
          4<span className="text-cyan-400">0</span>4
        </h1>

        {/* Terminal block */}
        <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4 mb-8 text-left font-mono text-sm">
          <p className="text-slate-500 mb-1">{'>>'} SCANNING TARGET...</p>
          <p className="text-red-400 mb-1">{'>>'} TARGET NOT FOUND</p>
          <p className="text-slate-500 mb-1">{'>>'} PATH: <span className="text-slate-300">unknown</span></p>
          <p className="text-cyan-400">{'>>'} RECOMMEND: return to known coordinates_</p>
        </div>

        <p className="text-slate-400 mb-8">
          This page doesn&apos;t exist or was moved. Our systems are still active — let&apos;s get you back on target.
        </p>

        {/* Nav links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-cyan-500 text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-cyan-400 transition-all duration-200"
          >
            ← Back to Home
          </Link>
          <Link
            href="/services"
            className="border border-slate-700 text-slate-300 px-6 py-3 rounded-lg font-semibold hover:border-cyan-500/50 hover:text-white transition-all duration-200"
          >
            View Services
          </Link>
          <Link
            href="/contact"
            className="border border-slate-700 text-slate-300 px-6 py-3 rounded-lg font-semibold hover:border-cyan-500/50 hover:text-white transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
