import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = ({ text, to, onClick, variant = 'primary', type = 'button' }) => {
  // Si tiene "to", funciona como Link (<a>); si no, como botón animado.
  const Component = to ? Link : motion.button;

  // Props exclusivas de cada modo: un <a> no debe recibir type="button",
  // y motion.button no recibe "to".
  const modeProps = to
    ? { to }
    : { type, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } };

  return (
    <Component
      onClick={onClick}
      className={`${styles.btn} ${styles[variant]}`}
      {...modeProps}
    >
      {text}
      <div className={styles.glow} />
    </Component>
  );
};

export default Button;