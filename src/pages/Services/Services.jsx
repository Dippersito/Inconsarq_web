import { motion } from 'framer-motion';
import ServicesHero from './components/ServicesHero';
import DynamicServices from './components/DynamicServices';
import styles from './Services.module.css';

const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.servicesPage}
    >
      {/* 1. HERO SECTION */}
      <ServicesHero />

      {/* 2. SECCIÓN DINÁMICA DE SERVICIOS (El "toque mágico") */}
      <DynamicServices />
      
    </motion.div>
  );
};

export default Services;