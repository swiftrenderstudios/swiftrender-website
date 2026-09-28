import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

import Home from './pages/Home.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';

import './App.css';

/**
 * Route map — each path renders its own page component:
 *
 *   /        → Home        (hero, handoff, portfolio preview, pipeline, CTA)
 *   /work    → Portfolio   (selected work grid)
 *   /process → Services    (four-step production pipeline)
 *   /brief   → Contact     (project brief form)
 */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Portfolio />} />
          <Route path="/process" element={<Services />} />
          <Route path="/brief" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}