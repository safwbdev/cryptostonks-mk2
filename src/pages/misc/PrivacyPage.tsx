import { PageLayout } from "../../components";

function PrivacyPage() {
    return (
        <PageLayout title="Privacy Policy" subtitle="Last updated: May 1, 2025" badge="Legal">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="prose prose-invert prose-sm max-w-none space-y-8">
                    {[
                        { heading: "1. Information We Collect", body: "We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This includes your name, email address, and usage data. We also automatically collect certain information when you use our services, including log data, device information, and cookies." },
                        { heading: "2. How We Use Your Information", body: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, respond to your comments and questions, and send marketing communications (with your consent). We do not sell your personal information to third parties." },
                        { heading: "3. Information Sharing", body: "We do not share your personal information with third parties except as described in this policy: with your consent, with service providers who assist us in operating our platform, when required by law, or to protect the rights and safety of CryptoStonks and our users." },
                        { heading: "4. Data Security", body: "We use industry-standard encryption (AES-256 at rest, TLS 1.3 in transit) to protect your data. We regularly audit our security practices and promptly address vulnerabilities. However, no method of transmission over the Internet is 100% secure." },
                        { heading: "5. Your Rights", body: "You have the right to access, update, or delete your personal information at any time through your account settings. You may also request a copy of your data in machine-readable format, or opt out of marketing communications by clicking 'unsubscribe' in any email." },
                        { heading: "6. Contact Us", body: "If you have questions about this Privacy Policy, please contact us at privacy@cryptostonks.io." },
                    ].map((s) => (
                        <div key={s.heading}>
                            <h2 className="text-white font-bold text-base mb-2">{s.heading}</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}

export default PrivacyPage