import { motion } from 'framer-motion';
import { Reveal } from '../../../components/Animation/Reveal';
import { Rocket, Eye } from 'lucide-react';
import styles from './MissionVision.module.css';

const MV_DATA = [
  {
    icon: <Rocket size={36} />,
    title: 'Nuestra Misión',
    text: '¡Ofrecer y brindar servicios personalizados y de calidad en construcción, geosintéticos, tubería HDPE, obras civiles y consultoría simplificando los procesos y ofreciendo las mejores soluciones!',
    delay: 0.1,
  },
  {
    icon: <Eye size={36} />,
    title: 'Nuestra Visión',
    text: 'Ser una de las mejores empresas ofreciendo servicios y soluciones de consultoría y ejecución de proyectos mineros y estatales, logrando un impacto positivo a nuestro entorno y nuestros colaboradores.',
    delay: 0.3,
  },
];

const MissionVision = () => {
  return (
    <section className={styles.missionSection}>
      {/* ── FONDO PARALLAX Y OVERLAYS ── */}
      <div className={styles.mvBg} />
      <div className={styles.mvOverlay} />
      
      {/* Brillos mágicos */}
      <div className={styles.glowBlobLeft} />
      <div className={styles.glowBlobRight} />

      <div className={`container ${styles.relativeContainer}`}>
        
        {/* TÍTULO CENTRADO */}
        <Reveal width="100%">
          <div className={styles.titleBlock}>
            <span className={styles.sectionLabel}>Lo que nos impulsa</span>
            <h2 className={styles.heading}>
              Nuestro <em>Norte</em>
            </h2>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              La misión y visión que guían cada decisión y cada obra que emprendemos.
            </p>
          </div>
        </Reveal>

        {/* TARJETAS */}
        <div className={styles.mvGrid}>
          {MV_DATA.map((item) => (
            /* Se usa motion.div directo para no cortar el hover ni la sombra */
            <motion.div
              key={item.title}
              className={styles.cardWrapper}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: item.delay, duration: 0.5 }}
            >
              <div className={styles.mvCard}>
                {/* Marca de agua centrada */}
                <span className={styles.mvNumber}>{item.number}</span>
                
                {/* Brillo interno al hacer hover */}
                <div className={styles.cardHoverGlow} />

                <div className={styles.cardContent}>
                  <div className={styles.mvIconBox}>
                    {item.icon}
                  </div>
                  <h3 className={styles.mvTitle}>{item.title}</h3>
                  <div className={styles.mvDivider} />
                  <p className={styles.mvText}>{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MissionVision;