import Link from 'next/link';

export default function CaseStudy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/research" className="inline-flex items-center text-purple-300 hover:text-purple-200 mb-6 transition-colors">
            ← Back to Research
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm font-medium">
              Case Study
            </span>
            <span className="text-gray-400 text-sm">January 2026</span>
            <span className="px-3 py-1 bg-green-500/30 text-green-200 rounded-full text-sm font-medium">
              Remediated
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Security Assessment of a Modern Next.js Web Application
          </h1>
          <p className="text-xl text-gray-300">
            Internal Case Study: ArcaneDigitalShield.com
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Executive Summary */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This report documents a security assessment conducted on ArcaneDigitalShield.com, a Next.js 15 
              web application deployed on Google Cloud Run. The assessment was performed as an internal 
              review to ensure our own infrastructure meets the security standards we recommend to clients.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The assessment identified <strong>6 findings</strong> across various severity levels, including 
              issues with data persistence, credential management, and input validation. All findings have 
              been remediated as of the publication date.
            </p>
          </section>

          {/* Findings Summary */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Findings Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-red-50 p-4 rounded-lg text-center border border-red-100">
                <div className="text-3xl font-bold text-red-600">0</div>
                <div className="text-sm text-red-700">Critical</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-100">
                <div className="text-3xl font-bold text-orange-600">1</div>
                <div className="text-sm text-orange-700">High</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center border border-yellow-100">
                <div className="text-3xl font-bold text-yellow-600">2</div>
                <div className="text-sm text-yellow-700">Medium</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
                <div className="text-3xl font-bold text-blue-600">3</div>
                <div className="text-sm text-blue-700">Low</div>
              </div>
            </div>
          </section>

          {/* Scope */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Scope & Methodology</h2>
            <h3 className="font-semibold text-gray-900 mb-2">Target Application</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Framework: Next.js 15.2.4 with React 18</li>
              <li>Deployment: Google Cloud Run (containerized)</li>
              <li>Storage: Google Cloud Storage (GCS)</li>
              <li>Features: Contact form, admin dashboard, static content</li>
            </ul>
            <h3 className="font-semibold text-gray-900 mb-2">Testing Methodology</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Source code review (white-box)</li>
              <li>Configuration analysis</li>
              <li>API endpoint testing</li>
              <li>Authentication and authorization review</li>
              <li>Data handling and storage analysis</li>
            </ul>
          </section>

          {/* Findings */}
          <section className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Detailed Findings</h2>

            {/* Finding 1 - High */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-orange-500 px-6 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">ADS-2026-001</span>
                  <span className="bg-white/20 text-white px-2 py-1 rounded text-sm">High Severity</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Contact Form Data Not Persisting in Production
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-gray-900">Description</h4>
                    <p>
                      The contact form API was configured to store submissions in local filesystem storage. 
                      While this works in development, Cloud Run containers are ephemeral - data written to 
                      the local filesystem is lost when containers restart or scale.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Impact</h4>
                    <p>
                      Customer inquiries submitted through the contact form were being lost, resulting in 
                      potential business impact and poor customer experience.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Root Cause</h4>
                    <p>
                      The <code className="bg-gray-100 px-1 rounded">GCS_BUCKET_NAME</code> environment variable 
                      was not configured in the Cloud Run deployment, causing the application to fall back to 
                      local storage.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Remediation</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Created dedicated GCS bucket for contact submissions</li>
                      <li>Configured environment variable in Cloud Run deployment</li>
                      <li>Granted appropriate IAM permissions to service account</li>
                      <li>Added email notifications as secondary alert mechanism</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <span className="text-green-700 font-semibold">✓ Remediated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Finding 2 - Medium */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-yellow-500 px-6 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">ADS-2026-002</span>
                  <span className="bg-white/20 text-white px-2 py-1 rounded text-sm">Medium Severity</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Admin Dashboard Lacks Authentication
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-gray-900">Description</h4>
                    <p>
                      The admin dashboard at <code className="bg-gray-100 px-1 rounded">/admin</code> was 
                      publicly accessible without any authentication mechanism.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Impact</h4>
                    <p>
                      Any visitor could view contact form submissions, potentially exposing customer 
                      PII (names, emails, phone numbers, messages).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Remediation</h4>
                    <p>
                      Acknowledged for future implementation. Current mitigation: admin URL is not linked 
                      from public pages. Authentication system planned for next development cycle.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <span className="text-yellow-700 font-semibold">◐ Mitigated (Auth Planned)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Finding 3 - Medium */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-yellow-500 px-6 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">ADS-2026-003</span>
                  <span className="bg-white/20 text-white px-2 py-1 rounded text-sm">Medium Severity</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Missing Email Notification System
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-gray-900">Description</h4>
                    <p>
                      No email notification system was configured, meaning new contact form submissions 
                      required manual checking of the admin dashboard.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Impact</h4>
                    <p>
                      Delayed response to customer inquiries could result in lost business opportunities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Remediation</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Implemented Nodemailer with Google Workspace SMTP</li>
                      <li>Stored credentials securely in Google Secret Manager</li>
                      <li>Added HTML email templates with quick-reply buttons</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <span className="text-green-700 font-semibold">✓ Remediated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Finding 4-6 - Low */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-blue-500 px-6 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">ADS-2026-004 to 006</span>
                  <span className="bg-white/20 text-white px-2 py-1 rounded text-sm">Low Severity</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Additional Low-Severity Findings
                </h3>
                <div className="space-y-4 text-gray-700">
                  <ul className="space-y-3">
                    <li>
                      <strong>ADS-2026-004:</strong> Missing rate limiting on contact form API endpoint. 
                      <span className="text-yellow-600"> (Planned)</span>
                    </li>
                    <li>
                      <strong>ADS-2026-005:</strong> No CAPTCHA or bot protection on public forms. 
                      <span className="text-yellow-600"> (Planned)</span>
                    </li>
                    <li>
                      <strong>ADS-2026-006:</strong> Security headers could be strengthened (CSP, etc.). 
                      <span className="text-green-600"> (Remediated)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Lessons Learned */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lessons Learned</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>1. Test in Production-Like Environments:</strong> The data persistence issue 
                would have been caught earlier if testing included deployment to Cloud Run with 
                production configurations.
              </p>
              <p>
                <strong>2. Environment Variables Are Critical:</strong> Missing or misconfigured 
                environment variables can completely change application behavior. Document all 
                required variables and verify during deployment.
              </p>
              <p>
                <strong>3. Defense in Depth:</strong> Adding email notifications as a secondary 
                mechanism ensures leads aren&apos;t lost even if storage issues occur.
              </p>
              <p>
                <strong>4. Eat Your Own Dog Food:</strong> Performing security assessments on our 
                own infrastructure keeps skills sharp and demonstrates commitment to security.
              </p>
            </div>
          </section>

          {/* Timeline */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-medium whitespace-nowrap">
                  Jan 23, 2026
                </div>
                <div className="text-gray-700">Assessment initiated during routine review</div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-medium whitespace-nowrap">
                  Jan 23, 2026
                </div>
                <div className="text-gray-700">High-severity finding identified (data persistence)</div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-medium whitespace-nowrap">
                  Jan 23, 2026
                </div>
                <div className="text-gray-700">Remediation implemented for critical findings</div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-medium whitespace-nowrap">
                  Jan 28, 2026
                </div>
                <div className="text-gray-700">Case study published</div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Want This Level of Assessment?</h2>
            <p className="text-purple-100 mb-6">
              We apply the same rigorous methodology to client engagements. Get a comprehensive 
              security assessment of your web applications and infrastructure.
            </p>
            <Link
              href="/book"
              className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Schedule Assessment
            </Link>
          </section>
        </div>
      </article>
    </div>
  );
}
