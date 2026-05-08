import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      <Navbar />

      <main className={styles.mainContent}>
        {children}
      </main>

      <Footer />

      <WhatsAppButton />
    </div>
  );
};

export default Layout;