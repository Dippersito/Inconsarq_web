import { motion } from 'framer-motion';
import Button from '../../../components/UI/Button/Button';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.heroSection}>

      <div className={styles.heroContent}>

        {/* Eyebrow */}
        <motion.span
          className={styles.heroEyebrow}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ingeniería & Arquitectura
        </motion.span>

        {/* Título */}
        <motion.h1
          className={styles.heroTitle}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          INCONS
          <span className={styles.highlight}>ARQ</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          className={styles.heroDivider}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        />

        {/* Subtítulo */}
        <motion.p
          className={styles.heroSubtitle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          En INCONSARQ llevamos tus proyectos de ingeniería y arquitectura
          al siguiente nivel con innovación y precisión técnica.
        </motion.p>

        {/* Botones */}
        <motion.div
          className={styles.buttonGroup}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Button text="Nuestros Servicios" to="/servicios" variant="primary" />
          <Button text="Contáctanos" to="/contacto" variant="outline" />
        </motion.div>

      </div>


    </section>
  );
};

export default Hero;