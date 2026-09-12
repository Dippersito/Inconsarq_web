import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout/Layout';

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Services = lazy(() => import('./pages/Services/Services'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageFallback = () => <div style={{ minHeight: '60vh' }} aria-hidden="true" />;

function App() {
  const location = useLocation();

  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/contacto" element={<Contact />} />
            {/* Cualquier ruta inexistente redirige al inicio (evita pantalla en blanco) */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  );
}

export default App;