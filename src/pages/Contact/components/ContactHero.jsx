import { motion } from 'framer-motion';
import { Reveal } from '../../../components/Animation/Reveal';
import styles from './ContactHero.module.css';

const ContactHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContent}`}>
        <Reveal>
          <span className={styles.heroEyebrow}>Escríbenos</span>
          <h1 className={styles.heroTitle}>
            Hablemos de tu<br />
            <em>Proyecto</em>
          </h1>
          <div className={styles.heroDivider} />
        </Reveal>

        <Reveal delay={0.2}>
          <p className={styles.heroSubtitle}>
            Estamos listos para convertir tus ideas en realidad.<br />
            Cuéntanos qué necesitas y te respondemos a la brevedad.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactHero;