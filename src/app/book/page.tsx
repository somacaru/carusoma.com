'use client';

const BOOKING_URL = 'https://calendly.com/arcanedigitalshield/30min';

export default function Book() {
  return (
    <div className="min-h-screen bg-arcane-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 text-sm font-medium">Available Now</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Book a Consultation
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Free security assessment. We&apos;ll review your setup and show you exactly where you&apos;re vulnerable.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Service Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🔧</span>
                <h3 className="text-xl font-bold text-white">IT Support</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Computer repair, virus removal, network issues. Quick fixes for everyday problems.
              </p>
              <div className="text-cyan-400 text-sm font-medium">30-60 min • From $50/hr</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🛡️</span>
                <h3 className="text-xl font-bold text-white">Security Assessment</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                AI-powered security audit, penetration testing consultation, compliance review.
              </p>
              <div className="text-cyan-400 text-sm font-medium">30-60 min • Free initial consult</div>
            </div>
          </div>

          {/* Availability Info */}
          <div className="bg-slate-800/30 backdrop-blur border border-cyan-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📅</span>
              <h3 className="text-lg font-bold text-white">Availability</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-500">Days</div>
                <div className="text-slate-300">Sunday - Saturday</div>
              </div>
              <div>
                <div className="text-slate-500">Hours</div>
                <div className="text-slate-300">9:00 AM - 5:00 PM MST</div>
              </div>
              <div>
                <div className="text-slate-500">Service Area</div>
                <div className="text-slate-300">Phoenix Metro</div>
              </div>
              <div>
                <div className="text-slate-500">Remote Support</div>
                <div className="text-emerald-400">Available</div>
              </div>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🚨</span>
              <h3 className="text-lg font-bold text-red-400">Emergency Response</h3>
            </div>
            <p className="text-red-300/80 text-sm mb-3">
              Active breach? Critical data at risk? Extended hours available for emergencies.
            </p>
            <a href="tel:+14807885419" className="text-red-400 font-semibold hover:text-red-300 transition-colors">
              Call Now: (480) 788-5419
            </a>
          </div>

          {/* Booking Widget/Link */}
          <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Select a Time</h2>
            <p className="text-slate-400 mb-6">
              Choose an available time slot that works for you.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-500 text-slate-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-cyan-400 transition-all"
            >
              📅 Open Calendar
            </a>
          </div>

          {/* Process */}
          <div className="mt-12">
            <div className="text-cyan-400 text-sm font-semibold tracking-wider mb-4 text-center">{'//'} PROCESS</div>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">What to Expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400 font-bold">1</div>
                <h3 className="font-bold text-white mb-2">Book</h3>
                <p className="text-slate-500 text-sm">Pick a time and tell us your issue.</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400 font-bold">2</div>
                <h3 className="font-bold text-white mb-2">Assess</h3>
                <p className="text-slate-500 text-sm">We diagnose and explain the situation.</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400 font-bold">3</div>
                <h3 className="font-bold text-white mb-2">Resolve</h3>
                <p className="text-slate-500 text-sm">Clear quote, then we fix it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
