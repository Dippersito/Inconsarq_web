import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Map, Ruler, Building2, Layers,
  Pipette, HardHat, Briefcase, Wrench, CheckCircle2
} from 'lucide-react';
import { Reveal } from '../../../components/Animation/Reveal';
import GlassCard from '../../../components/UI/GlassCard/GlassCard';
import { services } from '../../../config/services';
import styles from './DynamicServices.module.css';

// ── IMÁGENES PROPIAS DEL CLIENTE ──
import imgGeosinteticos  from '../../../assets/imagen10.webp';
import imgMiscelaneos    from '../../../assets/imagen16.webp';
import imgEjecucion      from '../../../assets/imagen22.webp';
import imgHdpe           from '../../../assets/imagen19.webp';
import imgConsultoria    from '../../../assets/imagen12.webp';
import imgSupervision    from '../../../assets/imagen13.webp';
import imgTopografia     from '../../../assets/imagen20.webp';
import imgExpedientes    from '../../../assets/imagen25.webp';
import imgSaneamiento    from '../../../assets/imagen24.webp';

// Textos en src/config/services.js; acá solo lo visual de cada servicio.
const VISUALS = {
  geosinteticos: { icon: <Layers size={22} />, image: imgGeosinteticos },
  miscelaneos: { icon: <Wrench size={22} />, image: imgMiscelaneos },
  hdpe: { icon: <Pipette size={22} />, image: imgHdpe },
  consultoria: { icon: <Briefcase size={22} />, image: imgConsultoria },
  ejecucion: { icon: <Building2 size={22} />, image: imgEjecucion },
  supervision: { icon: <HardHat size={22} />, image: imgSupervision },
  topografia: { icon: <Ruler size={22} />, image: imgTopografia },
  expedientes: { icon: <FileText size={22} />, image: imgExpedientes },
  saneamiento: { icon: <Map size={22} />, image: imgSaneamiento },
};

const servicesData = services.map((service) => ({ ...service, ...VISUALS[service.id] }));

const DynamicServices = () => {
  const [activeTab, setActiveTab] = useState(servicesData[0]);

  return (
    <section className={styles.dynamicSection}>

      {/* FONDO DINÁMICO */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab.id}
          className={styles.sectionBackground}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <img
            src={activeTab.image}
            alt=""
            className={styles.bgImage}
            aria-hidden="true"
          />
          <div className={styles.bgOverlay} />
          <div className={styles.bgVignette} />
        </motion.div>
      </AnimatePresence>

      {/* CONTENIDO */}
      <div className={`container ${styles.sectionInner}`}>

        {/* TÍTULO */}
        <Reveal width="100%">
          <div className={styles.titleBlock}>
            <span className={styles.sectionLabel}>Nuestros Servicios</span>
            <h2 className={styles.heading}>
              Especialidades <em>INCONSARQ</em>
            </h2>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              Selecciona un servicio para ver los detalles y soluciones que ofrecemos.
            </p>
          </div>
        </Reveal>

        <div className={styles.dynamicGrid}>

          {/* SIDEBAR */}
          <nav className={styles.sidebar} aria-label="Servicios">
            {servicesData.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveTab(service)}
                className={`${styles.tabButton} ${activeTab.id === service.id ? styles.activeTab : ''}`}
                aria-pressed={activeTab.id === service.id}
              >
                <span className={styles.tabIcon}>{service.icon}</span>
                <span className={styles.tabTitle}>{service.title}</span>
              </button>
            ))}
          </nav>

          {/* CONTENIDO DINÁMICO */}
          <div className={styles.contentArea}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <GlassCard className={styles.detailCard}>

                  {/* Cabecera */}
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIconBox}>
                      {activeTab.icon}
                    </div>
                    <div className={styles.cardHeaderText}>
                      <span className={styles.serviceTag}>{activeTab.tag}</span>
                      <h3 className={styles.cardTitle}>{activeTab.title}</h3>
                    </div>
                  </div>

                  {/* Cuerpo */}
                  <div className={styles.detailBody}>
                    <div className={styles.detailDivider} />
                    <p className={styles.detailDesc}>{activeTab.desc}</p>
                    <div className={styles.subServicesList}>
                      {activeTab.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          className={styles.subItem}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.08 }}
                        >
                          <CheckCircle2 className={styles.checkIcon} size={18} />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DynamicServices;