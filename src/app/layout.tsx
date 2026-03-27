import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Link from "next/link";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Arcane Digital Shield - Small-Business Security, Try-Hard by Design | Phoenix Cybersecurity",
  description: "Cybersecurity built for small businesses in Phoenix and beyond—AI-assisted monitoring, penetration testing, SOC 2, and incident response with no excuses and no fluff.",
  keywords: "cybersecurity, Phoenix, penetration testing, SOC 2, incident response, threat detection, security audit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-arcane-dark text-slate-200`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-slate-950 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">👁️</span>
                  <span className="text-xl font-bold text-white">
                    Arcane<span className="text-cyan-400">Digital</span>
                  </span>
                </div>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  Elite cybersecurity team serving Phoenix businesses. AI-powered threat detection, 
                  penetration testing, and 24/7 incident response.
                </p>
                <p className="text-cyan-400 font-semibold text-sm">Small-business security. Try-Hard by design.</p>
              </div>
              
              {/* Services */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Services</h3>
                <ul className="space-y-2">
                  <li><Link href="/services#it-support" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">IT Support</Link></li>
                  <li><Link href="/services#security" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">Security Audits</Link></li>
                  <li><Link href="/services#advanced" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">Penetration Testing</Link></li>
                  <li><Link href="/services#advanced" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">Incident Response</Link></li>
                  <li><Link href="/services#compliance" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">SOC 2 Compliance</Link></li>
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Contact</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="mailto:a.caruso@arcanedigitalshield.com" className="text-slate-500 hover:text-cyan-400 transition-colors">
                      a.caruso@arcanedigitalshield.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+14807885419" className="text-slate-500 hover:text-cyan-400 transition-colors">
                      (480) 788-5419
                    </a>
                  </li>
                  <li className="text-slate-600">
                    Phoenix Metro Area
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-400">Systems Monitored 24/7</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom bar */}
            <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-600 text-sm">
                &copy; {new Date().getFullYear()} Arcane Digital LLC. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <Link href="/research" className="text-slate-600 hover:text-cyan-400 transition-colors">Research</Link>
                <Link href="/admin" className="text-slate-600 hover:text-cyan-400 transition-colors">Admin</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
