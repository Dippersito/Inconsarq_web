import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Reveal } from '../../../components/Animation/Reveal';
import { Send, User, Mail, Phone, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { site } from '../../../config/site';
import { services } from '../../../config/services';
import styles from './ContactForm.module.css';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const IS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

// Misma lista que la página de Servicios (src/config/services.js) + "Otro"
const SERVICE_OPTIONS = [...services.map((s) => s.title), 'Otro'];

const ContactForm = () => {
  const form = useRef(null);
  const successRef = useRef(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Al enviar, el formulario desaparece: el foco pasa al mensaje de éxito
  // para que un lector de pantalla lo anuncie y el teclado no quede perdido.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Campo trampa (honeypot): una persona no lo ve ni lo llena; los bots que
    // completan todos los campos sí. Se simula éxito sin enviar nada.
    if (form.current?.elements.website?.value) {
      setStatus('success');
      return;
    }

    if (!IS_CONFIGURED) {
      setErrorMessage(
        `El formulario aún no está configurado. Escríbenos directamente a ${site.contact.email} o por WhatsApp.`
      );
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
      setStatus('success');
    } catch (error) {
      console.error('EmailJS error:', error);
      setErrorMessage(
        `No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos a ${site.contact.email}.`
      );
      setStatus('error');
    }
  };

  const isLoading = status === 'loading';
  const isSent = status === 'success';
  const hasError = status === 'error';

  return (
    <Reveal delay={0.15}>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <span className={styles.formEyebrow}>Formulario de contacto</span>
          <h2 className={styles.formTitle}>Envíanos un mensaje</h2>
          <p className={styles.formSubtitle}>
            Completa el formulario y te responderemos en menos de 24 horas.
          </p>
        </div>

        {isSent ? (
          <div className={styles.successState} role="status">
            <div className={styles.successIcon}>
              <CheckCircle2 size={40} />
            </div>
            <h3 ref={successRef} tabIndex={-1}>¡Mensaje enviado!</h3>
            <p>Gracias por contactarnos. Nos comunicaremos contigo a la brevedad.</p>
          </div>
        ) : (
          <form ref={form} onSubmit={handleSubmit} className={styles.form}>
            {/* Honeypot: fuera de pantalla, sin foco ni autocompletado */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="contact-website">No completar este campo</label>
              <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="contact-name">
                  <User size={13} /> Nombre completo
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="user_name"
                  className={styles.input}
                  placeholder="Ej: Juan Pérez"
                  required
                  autoComplete="name"
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="contact-phone">
                  <Phone size={13} /> Teléfono
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="user_phone"
                  className={styles.input}
                  placeholder="+51 900 000 000"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="contact-email">
                <Mail size={13} /> Correo electrónico
              </label>
              <input
                id="contact-email"
                type="email"
                name="user_email"
                className={styles.input}
                placeholder="juan@ejemplo.com"
                required
                autoComplete="email"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="contact-service">
                <MessageSquare size={13} /> Servicio de interés
              </label>
              <select
                id="contact-service"
                name="service"
                className={styles.input}
                defaultValue=""
                required
              >
                <option value="" disabled>Selecciona un servicio...</option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="contact-message">
                <MessageSquare size={13} /> Mensaje
              </label>
              <textarea
                id="contact-message"
                name="message"
                className={`${styles.input} ${styles.textarea}`}
                rows={5}
                placeholder="Cuéntanos sobre tu proyecto, ubicación y requerimientos..."
                required
              />
            </div>

            {hasError && (
              <div role="alert" className={styles.errorBanner}>
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className={`${styles.submitBtn} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.spinner} role="status" aria-label="Enviando mensaje" />
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
