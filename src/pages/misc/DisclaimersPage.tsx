import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import { Icon } from "../../components/Icon";
import { PageLayout } from "../../components";

function DisclaimersPage() {
    return (
        <PageLayout title="Disclaimers" subtitle="Important information about the data and content on CryptoStonks." badge="Legal">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">
                    <p className="text-yellow-400 font-bold text-sm mb-1 flex items-center gap-2">
                        <Icon icon={faTriangleExclamation} /> Not Financial Advice
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">All information provided on CryptoStonks is for informational and educational purposes only. Nothing on this platform constitutes financial, investment, legal, or tax advice.</p>
                </div>
                {[
                    { heading: "Data Accuracy", body: "While we strive to provide accurate and up-to-date market data, CryptoStonks makes no warranties about the completeness, reliability, or accuracy of this information. Data is sourced from third-party exchanges and may be subject to delays or errors." },
                    { heading: "Investment Risk", body: "Cryptocurrency markets are highly volatile and speculative. Past performance is not indicative of future results. You may lose some or all of your investment. Only invest what you can afford to lose." },
                    { heading: "Third-Party Links", body: "CryptoStonks may link to external websites. We are not responsible for the content or practices of third-party sites and recommend reviewing their privacy policies before providing any personal information." },
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

export default DisclaimersPage