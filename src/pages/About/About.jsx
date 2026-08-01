import { motion } from 'framer-motion';
import Seo from '../../components/Seo/Seo';
import AboutHero from './components/AboutHero';
import WhoWeAre from './components/WhoWeAre';
import MissionVision from './components/MissionVision';
import Values from './components/Values';
import TeamGrid from './components/TeamGrid';
import styles from './About.module.css';

const About = () => {
  return (
    <motion.div
      className={styles.aboutPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Seo
        title="Nosotros — INCONSARQ | Ingeniería y Construcción en Arequipa"
        description="Conoce a INCONSARQ: más de 10 años de experiencia en geosintéticos, obras civiles y consultoría técnica en Arequipa, Perú. Nuestro equipo, misión y valores."
        path="/nosotros"
      />
      <AboutHero />
      <WhoWeAre />
      <MissionVision />
      <Values />
      <TeamGrid />
    </motion.div>
  );
};

export default About;