import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react'; 
// 1. Importamos el logo
import logoImg from '../../assets/Nuevo_logo_202020.png'; 
import styles from './Footer.module.css';

const Footer = () => {
  
  // Función para llevar al usuario arriba suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* SECCIÓN 1: CONTACTO E INFORMACIÓN */}
        <div className={styles.column}>
          {/* Logo con Imagen */}
          <Link to="/" className={styles.logo} onClick={scrollToTop}>
            <img src={logoImg} alt="INCONSARQ Logo" className={styles.logoImage} />
          </Link>
          
          <p className={styles.description}>
            Ingeniería, Construcción y Arquitectura con estándares de calidad superior.
          </p>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.iconWrapper}><Phone size={18} /></span>
              <div>
                <p className={styles.contactLabel}>Representante</p>
                <p>Julissa Vitorino: +51 940 850 179</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.iconWrapper}><Mail size={18} /></span>
              <p>jvitorino@inconsarq.com</p>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.iconWrapper}><MapPin size={18} /></span>
              <a 
                href="https://goo.gl/maps/tu-direccion-aqui" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                Ver ubicación en Mapa
              </a>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: RUTAS (ENLACES RÁPIDOS) */}
        <div className={`${styles.column} ${styles.centerColumn}`}>
          <h3>Enlaces Rápidos</h3>
          <ul className={styles.linksList}>
            <li><Link to="/" onClick={scrollToTop}>Inicio</Link></li>
            <li><Link to="/nosotros" onClick={scrollToTop}>Nosotros</Link></li>
            <li><Link to="/servicios" onClick={scrollToTop}>Servicios</Link></li>
            <li><Link to="/contacto" onClick={scrollToTop}>Contacto</Link></li>
          </ul>
        </div>

        {/* SECCIÓN 3: SÍGUENOS (REDES SOCIALES) */}
        <div className={styles.column}>
          <h3>Síguenos</h3>
          <p className={styles.socialText}>Conecta con nosotros en nuestras redes.</p>
          
          <div className={styles.socialGrid}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="https://wa.me/51940850179" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
              <MessageCircle size={24} />
            </a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} INCONSARQ. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;