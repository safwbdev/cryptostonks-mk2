import { PageLayout } from "../../components";

function CookiePage() {
    return (
        <PageLayout title="Cookie Policy" subtitle="Last updated: May 1, 2025" badge="Legal">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                {[
                    { heading: "What are cookies?", body: "Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, keep you logged in, and understand how you use CryptoStonks." },
                    { heading: "Cookies we use", body: "Essential cookies (required for the site to function), preference cookies (remember your settings like dark mode and chart periods), analytics cookies (help us understand usage patterns to improve the product), and marketing cookies (only with your explicit consent)." },
                    { heading: "Managing cookies", body: "You can control cookies through your browser settings or through our cookie consent manager. Note that disabling essential cookies may affect the functionality of the site." },
                    { heading: "Contact", body: "For questions about our use of cookies, contact privacy@cryptostonks.io." },
                ].map((s) => (
                    <div key={s.heading}>
                        <h2 className="text-white font-bold text-base mb-2">{s.heading}</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
                    </div>
                ))}
            </div>
        </PageLayout>
    );
}

export default CookiePage