import { motion } from 'framer-motion';
import AboutHero from './components/AboutHero';
import WhoWeAre from './components/WhoWeAre';
import MissionVision from './components/MissionVision';
import Values from './components/Values';
import OurHistory from './components/OurHistory';
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
      <AboutHero />
      <WhoWeAre />
      <MissionVision />
      <Values />
      <OurHistory />
      <TeamGrid />
    </motion.div>
  );
};

export default About;