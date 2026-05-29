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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuVariants = {
    closed: { x: "100%", transition: { type: "tween", duration: 0.3 } },
    open: { x: 0, transition: { type: "tween", duration: 0.3 } }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        
        {/* LOGO CON IMAGEN Y SCROLL UP */}
        <NavLink to="/" className={styles.logo} onClick={closeMenu}>
          <img src={logoImg} alt="INCONSARQ Logo" className={styles.logoImage} decoding="async" width="160" height="48" fetchPriority="high" />
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