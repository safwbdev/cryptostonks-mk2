import { faBriefcase, faChartLine, faCode, faCoins, faGlobe, faMapLocation, faPen, faRocket, faServer, faUsers } from "@fortawesome/free-solid-svg-icons";


const TEAM = [
    { name: "Maya Reyes", role: "CEO & Co-Founder", icon: faBriefcase, bio: "Former Goldman Sachs VP. Built and sold two fintech startups. Crypto investor since 2013." },
    { name: "James Okafor", role: "CTO & Co-Founder", icon: faCode, bio: "Ex-Google Staff Engineer. Led infrastructure at Coinbase. Open-source contributor." },
    { name: "Priya Sharma", role: "Head of Product", icon: faChartLine, bio: "Previously at Robinhood and Stripe. Obsessed with making finance accessible to everyone." },
    { name: "Luca Benedetti", role: "Head of Data", icon: faServer, bio: "PhD in Computer Science (MIT). Built ML pipelines processing 10B+ data points daily." },
    { name: "Aiko Tanaka", role: "Head of Design", icon: faPen, bio: "Lead designer at Figma and Vercel. Winner of multiple design awards." },
    { name: "Sam Torres", role: "Head of Growth", icon: faRocket, bio: "Grew DeFi Pulse from 0 to 2M users. Passionate about crypto education." },
];

const STATS = [
    { value: "2M+", label: "Active users", icon: faUsers },
    { value: "10,000+", label: "Assets tracked", icon: faCoins },
    { value: "200+", label: "Exchanges", icon: faGlobe },
    { value: "150+", label: "Countries", icon: faMapLocation },
];

const TIMELINE = [
    { year: "2020", event: "CryptoStonks founded in a San Francisco garage with $80K in seed funding." },
    { year: "2021", event: "Launched public beta. Reached 50,000 users in the first 3 months." },
    { year: "2022", event: "Raised $12M Series A. Launched mobile apps for iOS and Android." },
    { year: "2023", event: "Crossed 1 million users. Launched portfolio tracker and price alerts." },
    { year: "2024", event: "Raised $40M Series B. Launched AI signals, API, and Exchange features." },
    { year: "2025", event: "2M+ users across 150+ countries. Processing 10B+ data points per day." },
];

export { TEAM, STATS, TIMELINE }