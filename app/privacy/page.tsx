'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FFFAF5]">

      <Navbar />

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-xs text-[#F4845F] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-josefin)' }}>✦ Legal</p>
        <h1 className="text-5xl text-[#1C0A00] mb-3" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '400' }}>Privacy Policy</h1>
        <p className="text-xs text-[#8B5E52] mb-12" style={{ fontFamily: 'var(--font-josefin)' }}>Last Updated: June 2, 2026</p>

        <div className="space-y-10 text-[#1C0A00]">

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>1. Introduction</h2>
            <p className="text-sm text-[#8B5E52] leading-relaxed">ZanZan Beauty Studio LLC is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store and protect your personal information when you use ZanZan Beauty Studio. By using our platform you agree to the collection and use of information in accordance with this policy.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>2. Information We Collect</h2>
            <p className="text-sm text-[#8B5E52] leading-relaxed mb-3">We collect the following types of information:</p>
            <ul className="space-y-2 text-sm text-[#8B5E52]">
              {[
                'Email address when you create an account or save a routine',
                'Photos you voluntarily upload for face analysis',
                'Makeup products you enter into the platform',
                'Beauty routines generated and saved by you',
                'Usage data such as pages visited and features used',
                'Device and browser information for technical purposes',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#F4845F] mt-0.5 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>3. How We Use Your Information</h2>
            <p className="text-sm text-[#8B5E52] leading-relaxed mb-3">We use your information to:</p>
            <ul className="space-y-2 text-sm text-[#8B5E52]">
              {[
                'Provide and improve our AI beauty routine service',
                'Save and retrieve your beauty routines',
                'Send you account related emails including sign in links',
                'Send weekly beauty content if you have opted in',
                'Analyze usage patterns to improve the platform',
                'Comply with legal obligations',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#F4845F] mt-0.5 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>4. Your Photos And Biometric Data</h2>
            <p className="text-sm text-[#8B5E52] leading-relaxed">Photos you upload are processed by our AI system to analyze facial features for the purpose of generating beauty routines. Your photos are processed securely and are not shared with third parties except our AI processing partner OpenAI. Photos are stored only as long as necessary to provide the service and are deleted when you delete your account. We do not use your photos for advertising or sell them to any third party.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>5. Data Sharing</h2>
            <p className="text-sm text-[#8B5E52] leading-relaxed">We never sell your personal data. We share data only with the following trusted service providers who help us operate the platform: OpenAI for AI processing, Supabase for secure data storage, and Vercel for hosting. All service providers are contractually required to protect your data and may not use it for any purpose other than providing services to ZanZan Beauty Studio.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>6. Cookies And Tracking</h2>
            <p className="text-sm text-[#8B5E52] leading-relaxed">ZanZan Beauty Studio uses essential cookies to maintain your login session and platform functionality. We do not use advertising cookies or sell data to advertisers. You can disable cookies in your browser settings but this may affect platform functionality.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>7. Data Security</h2>
            <p className="text-sm text-[#8B5E52] leading-relaxed">We implement industry standard security measures to protect your personal information including encrypted data storage, secure HTTPS connections, and row-level security on our database. However no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>8. Your Rights</h2>
            <p className="text-sm text-[#8B5E52] leading-relaxed mb-3">You have the right to:</p>
            <ul className="space-y-2 text-sm text-[#8B5E52]">
              {[
                'Access the personal data we hold about you',
                'Request correction of inaccurate personal data',
                'Request deletion of your account and all associated data',
                'Opt out of marketing emails at any time',
                'Request a copy of your data in a portable format',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#F4845F] mt-0.5 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>9. Children Under 13</h2>
            <p className="text-sm text-[#8B5E52] leading-relaxed">ZanZan Beauty Studio is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information please contact us immediately and we will delete it.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>10. Changes To This Policy</h2>
            <p className="text-sm text-[#8B5E52] leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice on our platform. Your continued use of ZanZan Beauty Studio after changes are posted constitutes your acceptance of the updated policy.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>11. Contact Us</h2>
            <p className="text-sm text-[#8B5E52] leading-relaxed">If you have any questions about this Privacy Policy or how we handle your data please contact us at privacy@zanzanbeauty.com</p>
          </div>

        </div>
      </div>

      <Footer />

    </div>
  )
}
