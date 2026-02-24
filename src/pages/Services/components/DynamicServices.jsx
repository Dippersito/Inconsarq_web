import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Map, Ruler, Building2, Layers,
  Pipette, HardHat, Briefcase, Wrench, CheckCircle2
} from 'lucide-react';
import { Reveal } from '../../../components/Animation/Reveal';
import GlassCard from '../../../components/UI/GlassCard/GlassCard';
import styles from './DynamicServices.module.css';

const servicesData = [
  {
    id: 'expedientes',
    title: 'Expedientes Técnicos',
    tag: 'Documentación',
    icon: <FileText size={22} />,
    desc: 'Brindamos asesoría integral en el desarrollo de procesos técnicos, implementando metodologías eficientes para la elaboración de documentación estratégica.',
    items: ['Fichas y perfiles técnicos', "Elaboración de TDR's", 'Metodologías de gestión eficiente'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070'
  },
  {
    id: 'saneamiento',
    title: 'Saneamiento Físico-Legal',
    tag: 'Legal',
    icon: <Map size={22} />,
    desc: 'Brindamos seguridad jurídica y técnica a sus activos mediante profesionales especializados en la regularización integral de inmuebles urbanos, prediales y rústicos.',
    items: ['Independización y subdivisión', 'Rectificación de áreas y linderos', 'Habilitaciones Urbanas y Reglamentos Internos'],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000'
  },
  {
    id: 'topografia',
    title: 'Levantamiento Topográfico',
    tag: 'Topografía',
    icon: <Ruler size={22} />,
    desc: 'Garantizamos precisión y efectividad en la toma de datos mediante tecnología de vanguardia, optimizando tiempos de ejecución en cada proyecto.',
    items: ['Fotogrametría con Drones', 'GPS Diferencial y Estaciones Totales', 'Certificación de áreas y metrados'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070'
  },
  {
    id: 'ejecucion',
    title: 'Ejecución Integral de Proyectos',
    tag: 'Construcción',
    icon: <Building2 size={22} />,
    desc: 'Gestionamos sus obras de forma integral, desde la concepción del diseño hasta la entrega final, adaptándonos a las necesidades específicas de cada cliente.',
    items: ['Edificación y Obras Civiles', 'Paisajismo y áreas verdes', 'Diseño de Sistemas de estabilidad de taludes'],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000'
  },
  {
    id: 'geosinteticos',
    title: 'Geosintéticos',
    tag: 'Minería',
    icon: <Layers size={22} />,
    desc: 'Expertos en la implementación de sistemas de contención y protección para el sector minero y gubernamental.',
    items: ['Pads de lixiviación y Relaveras', 'Reservorios y Rellenos sanitarios', 'Sistemas de contención de tanques'],
    /* Imagen actualizada: Minería / Movimiento de tierras */
    image: 'https://images.unsplash.com/photo-1579969106008-017e297801be?q=80&w=2070' 
  },
  {
    id: 'hdpe',
    title: 'Tuberías HDPE',
    tag: 'Instalaciones',
    icon: <Pipette size={22} />,
    desc: 'Suministramos e instalamos soluciones de polietileno de alta densidad, la opción más versátil y duradera para el transporte de fluidos críticos.',
    items: ['Termofusión certificada', 'Redes de alcantarillado y gas', 'Fabricación de accesorios'],
    /* Imagen actualizada: Tuberías industriales */
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=2070'
  },
  {
    id: 'supervision',
    title: 'Supervisión de Obras',
    tag: 'Control',
    icon: <HardHat size={22} />,
    desc: 'Especialistas en la gestión y control de proyectos bajo los más altos estándares de rigor técnico.',
    items: ['Supervisión de obras civiles', 'Gestión y aseguramiento de calidad', 'Protocolos de seguridad y protección ambiental'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071'
  },
  {
    id: 'consultoria',
    title: 'Asesoramiento y Consultoría',
    tag: 'Consultoría',
    icon: <Briefcase size={22} />,
    desc: 'Acompañamiento constante y especializado para garantizar la satisfacción del cliente.',
    items: ['Ingeniería y Arquitectura', 'Consultoría para Minería', 'Gestión de proyectos Estatales'],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070'
  },
  {
    id: 'miscelaneos',
    title: 'Servicios Misceláneos',
    tag: 'Industrial',
    icon: <Wrench size={22} />,
    desc: 'Soluciones integrales en metalmecánica para la fabricación y conservación de componentes industriales de acero.',
    items: ['Fabricación de Spool', 'Fabricación de Estructuras de Acero', 'Mantenimiento y pintado'],
    /* Imagen actualizada: Metalmecánica / Soldadura industrial */
    image: 'https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=2070'
  }
];

const DynamicServices = () => {
  const [activeTab, setActiveTab] = useState(servicesData[0]);

  return (
    <section className={styles.dynamicSection}>

      {/* FONDO DINÁMICO — cambia con el servicio activo */}
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
        
        {/* TÍTULO HOMOLOGADO */}
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
                onClick={() => setActiveTab(service)}
                className={`${styles.tabButton} ${activeTab.id === service.id ? styles.activeTab : ''}`}
                aria-current={activeTab.id === service.id ? 'true' : undefined}
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
                      <h2 className={styles.cardTitle}>{activeTab.title}</h2>
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