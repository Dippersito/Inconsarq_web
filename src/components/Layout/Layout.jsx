import Navbar from './Navbar';
import Footer from './Footer'; // <--- DESCOMENTAR ESTO
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      <Navbar />
      
      <main className={styles.mainContent}>
        {children}
      </main>
      
      <Footer /> {/* <--- DESCOMENTAR ESTO */}
    </div>
  );
};

export default Layout;