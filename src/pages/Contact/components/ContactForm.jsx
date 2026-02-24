import { useState } from 'react';
import { Reveal } from '../../../components/Animation/Reveal';
import { Send, User, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
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
          /* Estado de éxito */
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={40} />
            </div>
            <h3>¡Mensaje enviado!</h3>
            <p>Gracias por contactarnos. Nos comunicaremos contigo a la brevedad.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} noValidate>

            {/* Nombre + Teléfono en fila */}
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <User size={13} /> Nombre completo
                </label>
                <input
                  type="text"
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
                  className={styles.input}
                  placeholder="+51 900 000 000"
                />
              </div>
            </div>

            {/* Email */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Mail size={13} /> Correo electrónico
              </label>
              <input
                type="email"
                className={styles.input}
                placeholder="juan@ejemplo.com"
                required
              />
            </div>

            {/* Tipo de servicio */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <MessageSquare size={13} /> Servicio de interés
              </label>
              <select className={styles.input} defaultValue="">
                <option value="" disabled>Selecciona un servicio...</option>
                <option>Expedientes Técnicos</option>
                <option>Saneamiento Físico-Legal</option>
                <option>Levantamiento Topográfico</option>
                <option>Ejecución Integral de Proyectos</option>
                <option>Geosintéticos</option>
                <option>Tuberías HDPE</option>
                <option>Supervisión de Obras</option>
                <option>Asesoramiento y Consultoría</option>
                <option>Servicios Misceláneos</option>
                <option>Otro</option>
              </select>
            </div>

            {/* Mensaje */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <MessageSquare size={13} /> Mensaje
              </label>
              <textarea
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