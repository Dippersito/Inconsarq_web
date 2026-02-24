import { motion } from 'framer-motion';
import { Reveal } from '../../../components/Animation/Reveal';
import { Leaf, Star, ShieldCheck } from 'lucide-react';
import styles from './Values.module.css';

const VALUES = [
  {
    icon: <Leaf size={28} />,
    title: 'Medio Ambiente',
    desc: 'Desarrollamos cada proyecto con responsabilidad ambiental, minimizando el impacto en el entorno y promoviendo prácticas sostenibles en todas nuestras operaciones.',
    delay: 0.1,
  },
  {
    icon: <Star size={28} />,
    title: 'Calidad',
    desc: 'Excelencia técnica no negociable. Implementamos rigurosos estándares de control en cada fase del proyecto, desde los cimientos hasta el acabado final.',
    delay: 0.2,
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Seguridad',
    desc: 'La integridad de nuestro equipo y clientes es prioridad absoluta. Aplicamos protocolos estrictos de seguridad y protección en cada obra que ejecutamos.',
    delay: 0.3,
  },
];

const Values = () => {
  return (
    <section className={styles.valuesSection}>
      <div className={styles.bgGlow} />

      <div className="container">

        {/* Título centrado */}
        <Reveal width="100%">
          <div className={styles.titleBlock}>
            <span className={styles.sectionLabel}>Lo que nos define</span>
            <h2 className={styles.heading}>
              Nuestros <em>Pilares</em>
            </h2>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              Los fundamentos que guían cada decisión y cada obra que emprendemos.
            </p>
          </div>
        </Reveal>

        <div className={styles.valuesGrid}>
          {VALUES.map((value) => (
            /* Usamos motion.div directo para no recortar las animaciones ni el hover */
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: value.delay, duration: 0.5 }}
              className={styles.cardWrapper}
            >
              <div className={styles.valueItem}>
                <div className={styles.topAccent} />
                
                <div className={styles.valueHeader}>
                  <div className={styles.valueIconBox}>{value.icon}</div>
                  {/* Se eliminó el número (valueIndex) de aquí */}
                </div>
                
                <h4 className={styles.valueTitle}>{value.title}</h4>
                <div className={styles.valueDivider} />
                <p className={styles.valueDesc}>{value.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Values;