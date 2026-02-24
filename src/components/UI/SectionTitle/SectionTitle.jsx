import { motion } from 'framer-motion';
import styles from './SectionTitle.module.css';

const SectionTitle = ({ title, subtitle, align = 'center' }) => {
  return (
    <div className={`${styles.wrapper} ${styles[align]}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={styles.title}
      >
        {title}
        <span className={styles.line}></span>
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={styles.subtitle}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;