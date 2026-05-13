const PLANS = [
    {
        id: "free" as const,
        name: "Free",
        price: "$0",
        period: "forever",
        features: ["10,000+ assets", "Basic charts", "Portfolio tracker (5 assets)", "Daily news"],
        cta: "Get started free",
        highlight: false,
    },
    {
        id: "pro" as const,
        name: "Pro",
        price: "$9",
        period: "per month",
        features: ["Everything in Free", "Unlimited portfolio assets", "Advanced charts & indicators", "AI price signals", "Price alerts", "API access"],
        cta: "Start 14-day trial",
        highlight: true,
    },
];

export { PLANS }