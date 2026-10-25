import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      {/* Primer elemento enfocable: permite saltar el menú con el teclado */}
      <a href="#contenido" className="skip-link">Saltar al contenido</a>

      <Navbar />

      <main id="contenido" tabIndex={-1} className={styles.mainContent}>
        {children}
      </main>

      <Footer />

      <WhatsAppButton />
    </div>
  );
};

export default Layout;
