import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarusoMA - Expert Cybersecurity Consulting",
  description: "Protect your business with comprehensive security strategies, data protection, and incident response from CarusoMA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">CarusoMA</h3>
                <p className="text-gray-300">
                  Protecting businesses through expert cybersecurity solutions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/services" className="text-gray-300 hover:text-white">Services</a></li>
                  <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
                  <li><a href="/resources" className="text-gray-300 hover:text-white">Resources</a></li>
                  <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Email: info@carusoma.com</li>
                  <li>Phone: (480) 788-5419</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
              <p>&copy; {new Date().getFullYear()} CarusoMA. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
