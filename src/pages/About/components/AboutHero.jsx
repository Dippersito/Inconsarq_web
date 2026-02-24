import { motion } from 'framer-motion';
import { Reveal } from '../../../components/Animation/Reveal';
import styles from './AboutHero.module.css';

const AboutHero = () => {
  return (
    <section className={styles.heroSection}>

      <div className={`container ${styles.heroContent}`}>
        <Reveal>
          <span className={styles.heroEyebrow}>Quiénes somos</span>
          <h1 className={styles.heroTitle}>
            Nuestra <em>Historia</em>
          </h1>
          <div className={styles.heroDivider} />
        </Reveal>

        <Reveal delay={0.2}>
          <p className={styles.heroSubtitle}>
            Más de 10 años construyendo sueños
          </p>
        </Reveal>
      </div>


    </section>
  );
};

export default AboutHero;