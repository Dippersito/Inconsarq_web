import { Reveal } from '../../../components/Animation/Reveal';
import styles from './ServicesHero.module.css'; // ← su propio módulo

const ServicesHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContent}`}>

        <Reveal>
          <span className={styles.heroEyebrow}>Lo que ofrecemos</span>
          <h1 className={styles.heroTitle}>
            Nuestros <em>Servicios</em>
          </h1>
          <div className={styles.heroDivider} />
        </Reveal>

        <Reveal delay={0.2}>
          <p className={styles.heroSubtitle}>
            Ingeniería que construye confianza.
            Soluciones que brindan seguridad.
          </p>
        </Reveal>

      </div>
    </section>
  );
};

export default ServicesHero;