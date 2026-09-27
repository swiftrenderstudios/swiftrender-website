import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';

// This file is intentionally left minimal — page-specific markup and styling
// live in App.css only if you need overrides beyond the shared index.css.
import './App.css';

/**
 * Route map — this is what actually fixes "every page looks the same":
 * each path renders a distinct page component instead of one hardcoded view.
 *
 *   /        → Home        (hero, handoff, portfolio preview, pipeline, CTA)
 *   /work    → Portfolio   (selected work grid)
 *   /process → Services    (four-step production pipeline)
 *   /brief   → Contact     (project brief intake form)
 */
export default function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Portfolio />} />
          <Route path="/process" element={<Services />} />
          <Route path="/brief" element={<Contact />} />
        </Routes>
      </main>
      {/* The brief page sits on a light section, so its footer needs the light variant */}
      <Footer light={location.pathname === '/brief'} />
    </>
  );
}