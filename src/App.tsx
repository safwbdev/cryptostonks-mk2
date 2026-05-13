import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ScrollToTop,
  Header,
  TickerBar,
  Hero,
  MarketsTable,
  Features,
  Footer,
} from "./components";
import CoinDetail from "./components/CoinDetail";

import {
  // Main pages
  AboutPage,
  ApiPage,
  BlogPage,
  ExchangePage,
  GetStartedPage,
  LearnPage,
  MarketsPage,
  NewsPage,
  NotFoundPage,
  PortfolioPage,
  PriceAlertsPage,
  SignInPage,
  // Misc pages
  CareersPage,
  ChangelogPage,
  CommunityPage,
  ContactPage,
  DocsPage,
  HelpPage,
  PressPage,
  PrivacyPage,
  StatusPage,
  TermsPage,
  CookiePage,
  DisclaimersPage,
} from "./pages";

function HomePage() {
  return (
    <>
      <TickerBar />
      <main>
        <Hero />
        <MarketsTable />
        <Features />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#070B14] font-sans antialiased">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crypto/:uuid" element={<CoinDetail />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/price-alerts" element={<PriceAlertsPage />} />
          <Route path="/api" element={<ApiPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiePage />} />
          <Route path="/disclaimers" element={<DisclaimersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
