import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Importamos la imagen desde la carpeta assets
import logoImg from '../../assets/Nuevo_logo_202020.png'; 
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

  // FUNCIÓN CLAVE: Scroll arriba + Cerrar menú móvil
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const menuVariants = {
    closed: { x: "100%", transition: { type: "tween", duration: 0.3 } },
    open: { x: 0, transition: { type: "tween", duration: 0.3 } }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        
        {/* LOGO CON IMAGEN Y SCROLL UP */}
        <NavLink to="/" className={styles.logo} onClick={handleNavClick}>
          <img src={logoImg} alt="INCONSARQ Logo" className={styles.logoImage} />
        </NavLink>

        {/* DESKTOP LINKS */}
        <div className={styles.navLinks}>
          <NavLink to="/" onClick={handleNavClick} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Inicio</NavLink>
          <NavLink to="/nosotros" onClick={handleNavClick} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Nosotros</NavLink>
          <NavLink to="/servicios" onClick={handleNavClick} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Servicios</NavLink>
          <NavLink to="/contacto" onClick={handleNavClick} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Contacto</NavLink>
        </div>

        {/* MOBILE HAMBURGER */}
        <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* MOBILE MENU FULLSCREEN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className={styles.mobileLinksContainer}>
               <NavLink to="/" onClick={handleNavClick}>Inicio</NavLink>
               <NavLink to="/nosotros" onClick={handleNavClick}>Nosotros</NavLink>
               <NavLink to="/servicios" onClick={handleNavClick}>Servicios</NavLink>
               <NavLink to="/contacto" onClick={handleNavClick}>Contacto</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;