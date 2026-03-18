import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton'; // <-- Importar
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      <Navbar />
      
      <main className={styles.mainContent}>
        {children}
      </main>
      
      <Footer />

      {/* Elige la variante: 'standard' o 'themed' */}
      <WhatsAppButton variant="themed" /> 
    </div>
  );
};

export default Layout;