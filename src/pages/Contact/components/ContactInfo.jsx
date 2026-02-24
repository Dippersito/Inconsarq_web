import { Reveal } from '../../../components/Animation/Reveal';
import { Phone, Mail, MapPin } from 'lucide-react';
import styles from './ContactInfo.module.css';

const INFO_ITEMS = [
  {
    icon: <MapPin size={20} />,
    label: 'Dirección',
    lines: ['Arequipa, Perú'],
    delay: 0.1,
  },
  {
    icon: <Phone size={20} />,
    label: 'Teléfono',
    lines: ['+51 940 850 179'],
    link: 'tel:+51940850179',
    delay: 0.2,
  },
  {
    icon: <Mail size={20} />,
    label: 'Correo electrónico',
    lines: ['jvitorino@inconsarq.com'],
    link: 'mailto:jvitorino@inconsarq.com',
    delay: 0.3,
  },
];

const ContactInfo = () => {
  return (
    <div className={styles.infoSide}>

      <Reveal>
        <span className={styles.sectionLabel}>Contáctanos</span>
        <h2 className={styles.heading}>
          Ingeniería que<br />
          <em>construye confianza</em>
        </h2>
        <div className={styles.divider} />
        <p className={styles.description}>
          En INCONSARQ estamos comprometidos con brindarte una respuesta rápida
          y personalizada. Cuéntanos tu proyecto y te asesoramos sin compromiso.
        </p>
      </Reveal>

      <div className={styles.infoList}>
        {INFO_ITEMS.map((item) => (
          <Reveal key={item.label} delay={item.delay}>
            <div className={styles.infoItem}>
              <div className={styles.iconBox}>
                {item.icon}
              </div>
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>{item.label}</span>
                {item.link ? (
                  <a
                    href={item.link}
                    className={styles.infoValue}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                  >
                    {item.lines.join(' · ')}
                  </a>
                ) : (
                  item.lines.map((line, i) => (
                    <span key={i} className={styles.infoValue}>{line}</span>
                  ))
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Tagline del brochure */}
      <Reveal delay={0.4}>
        <div className={styles.tagline}>
          <span>"Soluciones que brindan seguridad."</span>
        </div>
      </Reveal>

    </div>
  );
};

export default ContactInfo;