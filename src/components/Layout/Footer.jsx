import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { site } from '../../config/site';
import logoImg from '../../assets/Nuevo_logo_202020.webp';
import styles from './Footer.module.css';

const Footer = () => {
  const whatsappUrl = `https://wa.me/${site.whatsapp.number}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.column}>
          <Link to="/" className={styles.logo}>
            <img
              src={logoImg}
              alt={`${site.brand.name} Logo`}
              className={styles.logoImage}
              loading="lazy"
              decoding="async"
              width="160"
              height="48"
            />
          </Link>

          <p className={styles.description}>
            {site.brand.fullName} con estándares de calidad superior.
          </p>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.iconWrapper}><Phone size={18} /></span>
              <div>
                <p className={styles.contactLabel}>Representante</p>
                <p>{site.contact.representative}: {site.contact.phone}</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.iconWrapper}><Mail size={18} /></span>
              <a href={`mailto:${site.contact.email}`} className={styles.mapLink}>
                {site.contact.email}
              </a>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.iconWrapper}><MapPin size={18} /></span>
              <a
                href={site.contact.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                {site.contact.location.addressShort}
              </a>
            </div>
          </div>
        </div>

        <div className={`${styles.column} ${styles.centerColumn}`}>
          <h3>Enlaces Rápidos</h3>
          <ul className={styles.linksList}>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Hablemos</h3>
          <p className={styles.socialText}>
            Comunícate directamente con nosotros.
          </p>

          <div className={styles.socialGrid}>
            <a
              href={`mailto:${site.contact.email}`}
              className={styles.socialIcon}
              aria-label="Enviar correo"
            >
              <Mail size={24} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.socialIcon}
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle size={24} />
            </a>
          </div>
        </div>

      </div>

      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} {site.brand.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
