import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Map, Ruler, Building2, Layers,
  Pipette, HardHat, Briefcase, Wrench, CheckCircle2
} from 'lucide-react';
import { Reveal } from '../../../components/Animation/Reveal';
import GlassCard from '../../../components/UI/GlassCard/GlassCard';
import styles from './DynamicServices.module.css';

// ── IMÁGENES PROPIAS DEL CLIENTE ──
// Renombrar los archivos en src/assets/services/ con estos nombres:
import imgGeosinteticos  from '../../../assets/imagen10.jpeg';  // Geomembrana al atardecer ⭐
import imgMiscelaneos    from '../../../assets/imagen16.png';  // Spool verde fabricado ⭐
import imgHdpe           from '../../../assets/imagen19.jpg';  // Termofusión HDPE ⭐
import imgConsultoria    from '../../../assets/imagen12.png';  // Técnicos trabajando en molino industrial
import imgEjecucion      from '../../../assets/imagen22.jpg';  // Excavadora instalando tubería / obra civil
import imgSupervision    from '../../../assets/imagen13.jpg';  // Reservorio con trabajadores supervisando
import imgTopografia     from '../../../assets/imagen20.jpg';  // Vista aérea / gran escala de obra minera
import imgExpedientes    from '../../../assets/imagen25.jpg';  // Estructuras metálicas — proceso técnico
import imgSaneamiento    from '../../../assets/imagen24.jpg';  // Reservorio con geomembrana terminado

const servicesData = [
  // ── MINERÍA PRIMERO ──
  {
    id: 'geosinteticos',
    title: 'Geosintéticos',
    tag: 'Minería',
    icon: <Layers size={22} />,
    desc: 'Expertos en la implementación de sistemas de contención y protección para el sector minero y gubernamental.',
    items: ['Pads de lixiviación y Relaveras', 'Reservorios y Rellenos sanitarios', 'Sistemas de contención de tanques'],
    image: imgGeosinteticos,
  },
  {
    id: 'miscelaneos',
    title: 'Servicios Misceláneos',
    tag: 'Industrial',
    icon: <Wrench size={22} />,
    desc: 'Soluciones integrales en metalmecánica para la fabricación y conservación de componentes industriales de acero.',
    items: ['Fabricación de Spool', 'Fabricación de Estructuras de Acero', 'Mantenimiento y pintado'],
    image: imgMiscelaneos,
  },
  {
    id: 'hdpe',
    title: 'Tuberías HDPE',
    tag: 'Instalaciones',
    icon: <Pipette size={22} />,
    desc: 'Suministramos e instalamos soluciones de polietileno de alta densidad, la opción más versátil y duradera para el transporte de fluidos críticos.',
    items: ['Termofusión certificada', 'Redes de alcantarillado y gas', 'Fabricación de accesorios'],
    image: imgHdpe,
  },
  {
    id: 'consultoria',
    title: 'Asesoramiento y Consultoría',
    tag: 'Consultoría',
    icon: <Briefcase size={22} />,
    desc: 'Acompañamiento constante y especializado para garantizar la satisfacción del cliente.',
    items: ['Ingeniería y Arquitectura', 'Consultoría para Minería', 'Gestión de proyectos Estatales'],
    image: imgConsultoria,
  },
  // ── SERVICIOS GENERALES ──
  {
    id: 'ejecucion',
    title: 'Ejecución Integral de Proyectos',
    tag: 'Construcción',
    icon: <Building2 size={22} />,
    desc: 'Gestionamos sus obras de forma integral, desde la concepción del diseño hasta la entrega final, adaptándonos a las necesidades específicas de cada cliente.',
    items: ['Edificación y Obras Civiles', 'Paisajismo y áreas verdes', 'Diseño de Sistemas de estabilidad de taludes'],
    image: imgEjecucion,
  },
  {
    id: 'supervision',
    title: 'Supervisión de Obras',
    tag: 'Control',
    icon: <HardHat size={22} />,
    desc: 'Especialistas en la gestión y control de proyectos bajo los más altos estándares de rigor técnico.',
    items: ['Supervisión de obras civiles', 'Gestión y aseguramiento de calidad', 'Protocolos de seguridad y protección ambiental'],
    image: imgSupervision,
  },
  {
    id: 'topografia',
    title: 'Levantamiento Topográfico',
    tag: 'Topografía',
    icon: <Ruler size={22} />,
    desc: 'Garantizamos precisión y efectividad en la toma de datos mediante tecnología de vanguardia, optimizando tiempos de ejecución en cada proyecto.',
    items: ['Fotogrametría con Drones', 'GPS Diferencial y Estaciones Totales', 'Certificación de áreas y metrados'],
    image: imgTopografia,
  },
  {
    id: 'expedientes',
    title: 'Expedientes Técnicos',
    tag: 'Documentación',
    icon: <FileText size={22} />,
    desc: 'Brindamos asesoría integral en el desarrollo de procesos técnicos, implementando metodologías eficientes para la elaboración de documentación estratégica.',
    items: ['Fichas y perfiles técnicos', "Elaboración de TDR's", 'Metodologías de gestión eficiente'],
    image: imgExpedientes,
  },
  {
    id: 'saneamiento',
    title: 'Saneamiento Físico-Legal',
    tag: 'Legal',
    icon: <Map size={22} />,
    desc: 'Brindamos seguridad jurídica y técnica a sus activos mediante profesionales especializados en la regularización integral de inmuebles urbanos, prediales y rústicos.',
    items: ['Independización y subdivisión', 'Rectificación de áreas y linderos', 'Habilitaciones Urbanas y Reglamentos Internos'],
    image: imgSaneamiento,
  },
];

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