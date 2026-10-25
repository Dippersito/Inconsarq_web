import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Importamos la imagen desde la carpeta assets
import logoImg from '../../assets/Nuevo_logo_202020.webp';
import styles from './NavBar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll(); // la página puede cargar ya desplazada (recarga a mitad de página)
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menú móvil abierto: Escape lo cierra y la página de fondo no se desplaza
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuVariants = {
    closed: { x: "100%", transition: { type: "tween", duration: 0.3 } },
    open: { x: 0, transition: { type: "tween", duration: 0.3 } }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`} aria-label="Principal">
      <div className={styles.container}>

        {/* LOGO CON IMAGEN Y SCROLL UP */}
        <NavLink to="/" className={styles.logo} onClick={closeMenu}>
          <img src={logoImg} alt="INCONSARQ — Inicio" className={styles.logoImage} decoding="async" width="160" height="74" fetchPriority="high" />
        </NavLink>

        {/* DESKTOP LINKS */}
        <div className={styles.navLinks}>
          <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Inicio</NavLink>
          <NavLink to="/nosotros" onClick={closeMenu} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Nosotros</NavLink>
          <NavLink to="/servicios" onClick={closeMenu} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Servicios</NavLink>
          <NavLink to="/contacto" onClick={closeMenu} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Contacto</NavLink>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          type="button"
          className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MOBILE MENU FULLSCREEN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileMenu}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className={styles.mobileLinksContainer}>
               <NavLink to="/" onClick={closeMenu}>Inicio</NavLink>
               <NavLink to="/nosotros" onClick={closeMenu}>Nosotros</NavLink>
               <NavLink to="/servicios" onClick={closeMenu}>Servicios</NavLink>
               <NavLink to="/contacto" onClick={closeMenu}>Contacto</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
