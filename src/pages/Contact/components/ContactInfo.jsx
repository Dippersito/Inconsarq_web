import { Reveal } from '../../../components/Animation/Reveal';
import { Phone, Mail, MapPin } from 'lucide-react';
import { site } from '../../../config/site';
import styles from './ContactInfo.module.css';

const INFO_ITEMS = [
  {
    icon: <MapPin size={20} />,
    label: 'Dirección',
    lines: [site.contact.location.address],
    link: site.contact.location.mapsUrl,
    delay: 0.1,
  },
  {
    icon: <Phone size={20} />,
    label: 'Teléfono',
    lines: [site.contact.phone],
    link: `tel:${site.contact.phoneTel}`,
    delay: 0.2,
  },
  {
    icon: <Mail size={20} />,
    label: 'Correo electrónico',
    lines: [site.contact.email],
    link: `mailto:${site.contact.email}`,
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
          En {site.brand.name} estamos comprometidos con brindarte una respuesta rápida
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

      <Reveal delay={0.4}>
        <div className={styles.tagline}>
          <span>&ldquo;{site.brand.tagline}.&rdquo;</span>
        </div>
      </Reveal>

    </div>
  );
};

export default ContactInfo;
