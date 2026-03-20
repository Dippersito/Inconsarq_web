import { useState, useRef } from 'react'; // <--- Añadido useRef
import emailjs from '@emailjs/browser';   // <--- Añadida librería
import { Reveal } from '../../../components/Animation/Reveal';
import { Send, User, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const form = useRef(); // Referencia para el formulario
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Configuración de EmailJS
    emailjs.sendForm(
      'YOUR_SERVICE_ID',   // Reemplaza con tu Service ID
      'YOUR_TEMPLATE_ID',  // Reemplaza con tu Template ID
      form.current,
      'YOUR_PUBLIC_KEY'    // Reemplaza con tu Public Key
    )
    .then((result) => {
      setLoading(false);
      setSent(true);
    }, (error) => {
      setLoading(false);
      alert("Lo sentimos, hubo un error al enviar el mensaje. Inténtalo de nuevo.");
      console.log(error.text);
    });
  };

  return (
    <Reveal delay={0.15}>
      <div className={styles.formCard}>
        {/* Cabecera */}
        <div className={styles.formHeader}>
          <span className={styles.formEyebrow}>Formulario de contacto</span>
          <h2 className={styles.formTitle}>Envíanos un mensaje</h2>
          <p className={styles.formSubtitle}>
            Completa el formulario y te responderemos en menos de 24 horas.
          </p>
        </div>

        {sent ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={40} />
            </div>
            <h3>¡Mensaje enviado!</h3>
            <p>Gracias por contactarnos. Nos comunicaremos contigo a la brevedad.</p>
          </div>
        ) : (
          <form ref={form} onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <User size={13} /> Nombre completo
                </label>
                <input
                  type="text"
                  name="user_name" // <--- Importante para EmailJS
                  className={styles.input}
                  placeholder="Ej: Juan Pérez"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <Phone size={13} /> Teléfono
                </label>
                <input
                  type="tel"
                  name="user_phone" // <--- Importante
                  className={styles.input}
                  placeholder="+51 900 000 000"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Mail size={13} /> Correo electrónico
              </label>
              <input
                type="email"
                name="user_email" // <--- Importante
                className={styles.input}
                placeholder="juan@ejemplo.com"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <MessageSquare size={13} /> Servicio de interés
              </label>
              <select name="service" className={styles.input} defaultValue="" required>
                <option value="" disabled>Selecciona un servicio...</option>
                <option value="Expedientes Técnicos">Expedientes Técnicos</option>
                <option value="Saneamiento Físico-Legal">Saneamiento Físico-Legal</option>
                <option value="Levantamiento Topográfico">Levantamiento Topográfico</option>
                <option value="Ejecución Integral de Proyectos">Ejecución Integral de Proyectos</option>
                <option value="Geosintéticos">Geosintéticos</option>
                <option value="Tuberías HDPE">Tuberías HDPE</option>
                <option value="Supervisión de Obras">Supervisión de Obras</option>
                <option value="Asesoramiento y Consultoría">Asesoramiento y Consultoría</option>
                <option value="Servicios Misceláneos">Servicios Misceláneos</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <MessageSquare size={13} /> Mensaje
              </label>
              <textarea
                name="message" // <--- Importante
                className={`${styles.input} ${styles.textarea}`}
                rows={5}
                placeholder="Cuéntanos sobre tu proyecto, ubicación y requerimientos..."
                required
              />
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} ${loading ? styles.loading : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                <>
                  <span>Enviar Mensaje</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </Reveal>
  );
};

export default ContactForm;