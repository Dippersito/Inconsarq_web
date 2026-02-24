import styles from './GlassCard.module.css';

const GlassCard = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div className={`${styles.glass} ${hoverEffect ? styles.hover : ''} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;