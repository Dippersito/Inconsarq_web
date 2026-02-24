import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = ({ text, to, onClick, variant = 'primary', type = 'button' }) => {
  // Si tiene "to", funciona como Link, si no, como botón normal
  const Component = to ? Link : motion.button;
  
  return (
    <Component
      to={to}
      onClick={onClick}
      type={type}
      className={`${styles.btn} ${styles[variant]}`}
      // Props de animación solo si es motion.button (Link no acepta whileHover directo igual)
      {...(to ? {} : { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } })}
    >
      {text}
      <div className={styles.glow} />
    </Component>
  );
};

export default Button;