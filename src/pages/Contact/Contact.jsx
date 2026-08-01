import { motion } from 'framer-motion';
import Seo from '../../components/Seo/Seo';
import ContactHero from './components/ContactHero';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <motion.div
      className={styles.contactPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Seo
        title="Contacto — INCONSARQ | Cotiza tu proyecto en Arequipa"
        description="Contáctanos para cotizar tu proyecto de ingeniería o construcción. Estamos en Cerro Colorado, Arequipa. Escríbenos por el formulario o por WhatsApp."
        path="/contacto"
      />
      <ContactHero />

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;