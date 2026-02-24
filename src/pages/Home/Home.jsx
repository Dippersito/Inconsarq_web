import { motion } from 'framer-motion';
import Hero from './components/Hero';
import WhoWeAreHome from './components/WhoWeAreHome';
import ServicesCarousel from './components/ServicesCarousel';
import CallToAction from './components/CallToAction';
import styles from './Home.module.css';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.homeContainer}
    >
      <Hero />
      <WhoWeAreHome />
      <ServicesCarousel />
      <CallToAction />
    </motion.div>
  );
};

export default Home;