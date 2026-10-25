import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';

import Layout from './components/Layout/Layout';
// El inicio es la página de entrada de casi todas las visitas: va en el paquete
// principal para no esperar una descarga más antes de pintar el hero.
import Home from './pages/Home/Home';

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

// Ocupa la pantalla completa mientras carga la página: si fuera más bajo, el
// footer aparecería arriba y saltaría hacia abajo al cargar (CLS).
const PageFallback = () => <div style={{ minHeight: '100vh' }} aria-hidden="true" />;

function App() {
  const location = useLocation();

  return (
    // reducedMotion="user": respeta "reducir movimiento" del sistema operativo
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  );
}

export default App;
