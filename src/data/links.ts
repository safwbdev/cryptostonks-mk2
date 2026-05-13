import { faDiscord, faReddit, faTelegram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

const FOOTER_LINKS = {
    Product: [
        {
            label: "Markets",
            to: "/markets"
        },
        {
            label: "Portfolio Tracker",
            to: "/portfolio"
        },
        {
            label: "Price Alerts",
            to: "/price-alerts"
        },
        {
            label: "Exchange",
            to: "/exchange"
        },
        {
            label: "API",
            to: "/api"
        },
    ],
    Company: [
        {
            label: "About Us",
            to: "/about"

        },
        {
            label: "Blog",
            to: "/blog"

        },
        {
            label: "Careers",
            to: "/careers"

        },
        {
            label: "Press",
            to: "/press"

        },
        {
            label: "Contact",
            to: "/contact"

        },
    ],
    Resources: [
        {
            label: "Documentation",
            to: "/docs"
        },
        {
            label: "Help Center",
            to: "/help"
        },
        {
            label: "Community",
            to: "/community"
        },
        {
            label: "Status",
            to: "/status"
        },
        {
            label: "Changelog",
            to: "/changelog"
        },
    ],
    Legal: [
        {
            label: "Privacy Policy",
            to: "/privacy"
        },
        {
            label: "Terms of Service",
            to: "/terms"
        },
        {
            label: "Cookie Policy",
            to: "/cookies"
        },
        {
            label: "Disclaimers",
            to: "/disclaimers"
        },
    ],
};

const SOCIALS = [
    {
        label: "X",
        title: "X",
        to: "/community",
        icon: faXTwitter as IconProp,
        iconColor: "text-slate-300",
    },
    {
        label: "D",
        title: "Discord",
        to: "/community",
        icon: faDiscord as IconProp,
        iconColor: "text-indigo-400",
    },
    {
        label: "T",
        title: "Telegram",
        to: "/community",
        icon: faTelegram as IconProp,
        iconColor: "text-blue-400",
    },
    {
        label: "R",
        title: "Reddit",
        to: "/community",
        icon: faReddit as IconProp,
        iconColor: "text-orange-400",
    },
];

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Markets", to: "/markets" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Exchange", to: "/exchange" },
    { label: "News", to: "/news" },
    { label: "Learn", to: "/learn" },
];

export { FOOTER_LINKS, SOCIALS, NAV_LINKS }