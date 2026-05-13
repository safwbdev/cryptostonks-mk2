import { PageLayout } from "../../components";

function TermsPage() {
    return (
        <PageLayout title="Terms of Service" subtitle="Last updated: May 1, 2025" badge="Legal">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-8">
                    {[
                        { heading: "1. Acceptance of Terms", body: "By accessing or using CryptoStonks, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services." },
                        { heading: "2. Description of Service", body: "CryptoStonks provides a cryptocurrency data platform that aggregates market data from third-party sources. We do not provide financial, investment, legal, or tax advice. All data is for informational purposes only." },
                        { heading: "3. Not Financial Advice", body: "IMPORTANT: Nothing on CryptoStonks constitutes financial advice. Cryptocurrency investments are highly volatile and risky. You should conduct your own research and consult a qualified financial advisor before making any investment decisions." },
                        { heading: "4. User Accounts", body: "You are responsible for safeguarding your account credentials and for all activity that occurs under your account. You must notify us immediately of any unauthorized use of your account." },
                        { heading: "5. Prohibited Uses", body: "You may not use CryptoStonks to scrape data at scale without a commercial API license, resell our data to third parties, attempt to reverse-engineer our platform, or engage in any illegal activities." },
                        { heading: "6. Limitation of Liability", body: "CryptoStonks shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of, or inability to use, our services." },
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

export default TermsPage