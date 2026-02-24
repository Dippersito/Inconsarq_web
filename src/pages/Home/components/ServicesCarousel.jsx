import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../../components/Animation/Reveal';
import styles from './ServicesCarousel.module.css';

const services = [
  {
    id: 1,
    title: 'Arquitectura & Diseño',
    tag: 'Diseño',
    desc: 'Creamos espacios que inspiran. Desde el boceto inicial hasta los planos ejecutivos, fusionamos estética y funcionalidad.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
    stat: { value: '+120', label: 'Proyectos' },
  },
  {
    id: 2,
    title: 'Ingeniería Civil',
    tag: 'Ingeniería',
    desc: 'Cálculos precisos y estructuras sólidas. Garantizamos la seguridad y normatividad en cada metro cuadrado construido.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop',
    stat: { value: '100%', label: 'Normativa' },
  },
  {
    id: 3,
    title: 'Gestión de Proyectos',
    tag: 'Gestión',
    desc: 'Optimizamos recursos y tiempos. Tu obra entregada en plazo, bajo presupuesto y con los estándares más altos.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop',
    stat: { value: '100%', label: 'Satisfacción' },
  },
];

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((idx, dir = 1) => {
    setDirection(dir);
    setCurrentIndex(idx);
  }, []);

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % services.length, 1);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + services.length) % services.length, -1);
  }, [currentIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, goNext]);

  const current = services[currentIndex];

  return (
    <section className={styles.carouselSection}>
      <div className="container">

        {/* ── TÍTULO ── */}
        <Reveal width="100%">
          <div className={styles.titleBlock}>
            <span className={styles.sectionLabel}>Lo que hacemos</span>
            <h2 className={styles.heading}>
              Nuestras <em>Especialidades</em>
            </h2>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              Excelencia técnica en cada disciplina que emprendemos.
            </p>
          </div>
        </Reveal>

        {/* ── CARRUSEL ── */}
        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* IMAGEN */}
          <div className={styles.carouselImageSide}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={current.image}
                alt={current.title}
                className={styles.carouselMainImage}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </AnimatePresence>
            <div className={styles.carouselOverlay} />

            {/* Contador */}
            <div className={styles.slideCounter}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  className={styles.slideCounterCurrent}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(currentIndex + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              <span className={styles.slideCounterSep}>/</span>
              <span className={styles.slideCounterTotal}>
                {String(services.length).padStart(2, '0')}
              </span>
            </div>

            {/* Stat badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className={styles.statBadge}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className={styles.statValue}>{current.stat.value}</span>
                <span className={styles.statLabel}>{current.stat.label}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CONTENIDO */}
          <div className={styles.carouselContentSide}>
            <div className={styles.carouselNav}>
              <div className={styles.indicators}>
                {services.map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
                    onClick={() => goTo(idx, idx > currentIndex ? 1 : -1)}
                    aria-label={`Ir al servicio ${idx + 1}`}
                  />
                ))}
              </div>
              <div className={styles.arrowBtns}>
                <button className={styles.arrowBtn} onClick={goPrev} aria-label="Anterior">
                  <ChevronLeft size={18} />
                </button>
                <button className={styles.arrowBtn} onClick={goNext} aria-label="Siguiente">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <span className={styles.serviceTag}>{current.tag}</span>
                <h3 className={styles.carouselServiceTitle}>{current.title}</h3>
                <motion.div
                  className={styles.carouselDivider}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                />
                <p className={styles.carouselServiceDesc}>{current.desc}</p>
                <Link to="/servicios" className={styles.learnMoreBtn}>
                  <span>Ver detalles</span>
                  <span className={styles.arrowIcon}><ArrowRight size={16} /></span>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Barra de progreso */}
            <div className={styles.progressBar}>
              <motion.div
                key={currentIndex}
                className={styles.progressFill}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isPaused ? undefined : 1 }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesCarousel;