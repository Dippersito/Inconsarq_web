import { motion } from 'framer-motion';
import { Reveal } from '../../../components/Animation/Reveal';
import GlassCard from '../../../components/UI/GlassCard/GlassCard';
import Button from '../../../components/UI/Button/Button';
import { ShieldCheck, Lightbulb, Award } from 'lucide-react';
import styles from './WhoWeAreHome.module.css';

const WHO_WE_ARE_CARDS = [
  { icon: <ShieldCheck size={26} />, title: 'INTEGRIDAD', delay: 0.2 },
  { icon: <Lightbulb size={26} />, title: 'INNOVACIÓN', delay: 0.35 },
  { icon: <Award size={26} />, title: 'CALIDAD', delay: 0.5 },
];

const WhoWeAreHome = () => {
  return (
    <section className={styles.whoSection}>
      <div className={styles.whoOverlay} />

      <div className="container">
        <div className={styles.whoGrid}>

          {/* COLUMNA IZQUIERDA */}
          <div className={styles.textContent}>
            <Reveal>
              <span className={styles.sectionLabel}>Nuestra empresa</span>
              <h2 className={styles.whoTitle}>
                ¿QUIÉNES<br />SOMOS?
              </h2>
              <div className={styles.divider} />
            </Reveal>

            <Reveal delay={0.2}>
              <p className={styles.whoDescription}>
                Somos una empresa de servicios generales que cuenta con profesionales
                altamente calificados y comprometidos con nuestros clientes a fin de
                lograr resultados óptimos.
              </p>
            </Reveal>

            {/* Botón con motion directo (Sin cortes) */}
            <motion.div
              className={styles.btnWrapper}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button text="Conócenos Más" to="/nosotros" variant="primary" />
            </motion.div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className={styles.cardsColumn}>
            {WHO_WE_ARE_CARDS.map((card) => (
              /* Tarjetas con motion directo para respetar el CSS y no cortar el hover */
              <motion.div
                key={card.title}
                className={styles.cardWrapper}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: card.delay, duration: 0.5 }}
              >
                <GlassCard className={styles.glassCardWho}>
                  <div className={styles.cardInner}>
                    <div className={styles.iconBox}>{card.icon}</div>
                    <span className={styles.cardTitle}>{card.title}</span>
                  </div>
                  <div className={styles.cardAccent} />
                </GlassCard>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAreHome;