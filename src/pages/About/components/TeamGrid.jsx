import { motion } from 'framer-motion';
import { Reveal } from '../../../components/Animation/Reveal';
import { HardHat, Briefcase } from 'lucide-react';
import styles from './TeamGrid.module.css';

// 1. IMPORTAMOS LAS IMÁGENES LOCALES DESDE ASSETS
import fotoJuan from '../../../assets/foto_juan.png';
import fotoJulissa from '../../../assets/foto_julissa.png';

const TEAM = [
  {
    name: 'Ing. Juan Medina Rojas',
    role: 'Especialista en Ejecución y Control de Calidad',
    profile: 'Ingeniero experto en revestimientos con geosintéticos, termofusión de tuberías HDPE y estabilidad de taludes.',
    skills: ['Geosintéticos', 'Tuberías HDPE', 'Estabilidad de Taludes'],
    icon: <HardHat size={18} />,
    image: fotoJuan, // 2. USAMOS LA VARIABLE IMPORTADA
    delay: 0.1,
  },
  {
    name: 'Arq. Julissa Vitorino Becerra',
    role: 'Especialista en Gestión Integral de Proyectos',
    profile: 'Arquitecta con 12 años de trayectoria en gestión de proyectos inmobiliarios y saneamiento físico-legal.',
    skills: ['Saneamiento Legal', 'Gestión de Proyectos', 'SUNARP'],
    icon: <Briefcase size={18} />,
    image: fotoJulissa, // 2. USAMOS LA VARIABLE IMPORTADA
    delay: 0.25,
  },
];

const TeamGrid = () => {
  return (
    <section className={styles.teamSection}>
      <div className={styles.bgAccent} />

      <div className="container">

        {/* Título */}
        <Reveal width="100%">
          <div className={styles.titleBlock}>
            <span className={styles.sectionLabel}>Staff Técnico</span>
            <h2 className={styles.heading}>
              Nuestro <em>Equipo</em>
            </h2>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              Un equipo multidisciplinario con vasta experiencia en las
              operaciones más importantes del Perú.
            </p>
          </div>
        </Reveal>

        <div className={styles.teamGrid}>
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: member.delay, duration: 0.5 }}
              className={styles.cardWrapper}
            >
              <div className={styles.memberCard}>
                <div className={styles.imageWrapper}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className={styles.memberImage}
                  />
                  <div className={styles.imageOverlay} />
                  <div className={styles.roleTag}>
                    {member.icon}
                    <span>{member.skills[0]}</span>
                  </div>
                </div>

                <div className={styles.memberContent}>
                  <div className={styles.memberHeader}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <span className={styles.memberRole}>{member.role}</span>
                  </div>
                  <div className={styles.memberDivider} />
                  
                  <div className={styles.profileBlock}>
                    <p className={styles.profileText}>{member.profile}</p>
                  </div>
                  
                  <div className={styles.skillsRow}>
                    {member.skills.map((skill) => (
                      <span key={skill} className={styles.skillTag}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;