import { motion } from 'framer-motion';
import { Reveal } from '../../../components/Animation/Reveal';
import Button from '../../../components/UI/Button/Button';
import styles from './CallToAction.module.css';

const CallToAction = () => {
  return (
    <section className={styles.ctaSection}>
      {/* Fondo con imagen paralax sutil */}
      <div className={styles.ctaBg} />
      <div className={styles.ctaOverlay} />

      <div className="container">
        <div className={styles.ctaInner}>

          <Reveal>
            <span className={styles.ctaEyebrow}>¿Tienes un proyecto en mente?</span>
            <h2 className={styles.ctaTitle}>
              Listo para construir<br />
              <em>tu visión</em>
            </h2>
            <div className={styles.ctaDivider} />
          </Reveal>

          <Reveal delay={0.2}>
            <p className={styles.ctaSubtitle}>
              Hablemos hoy mismo. Nuestro equipo de expertos está listo para
              asesorarte y llevar tu proyecto al siguiente nivel.
            </p>
          </Reveal>

          {/* Botón con motion directo para evitar recortes del glow/hover */}
          <motion.div 
            className={styles.ctaActions}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <Button
              text="Cotizar Proyecto"
              to="/contacto"
              variant="primary"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CallToAction;