import styles from './WhatsAppButton.module.css';

// Cambia este número por el del cliente (con código de país, sin + ni espacios)
const WPP_NUMBER = '51940850179';
const WPP_MESSAGE = '¡Hola! Me interesa conocer más sobre sus servicios.';

const WhatsAppButton = () => {
  const url = `https://wa.me/${WPP_NUMBER}?text=${encodeURIComponent(WPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.wppButton}
      aria-label="Contactar por WhatsApp"
    >
      {/* Ícono SVG oficial de WhatsApp */}
      <svg
        className={styles.wppIcon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.77L0 32l8.468-2.004A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.747-1.836l-.484-.287-5.024 1.188 1.21-4.893-.317-.503A13.23 13.23 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.355-1.162-2.72-1.295-.366-.133-.632-.199-.898.199-.266.398-1.031 1.295-1.264 1.561-.233.266-.465.299-.863.1-.398-.199-1.681-.619-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.233-.398-.025-.613.175-.811.18-.178.398-.465.598-.698.199-.233.266-.398.398-.664.133-.266.066-.498-.033-.697-.1-.199-.898-2.165-1.231-2.963-.324-.778-.653-.673-.898-.686l-.765-.013c-.266 0-.698.1-1.064.498s-1.397 1.362-1.397 3.322 1.43 3.853 1.629 4.119c.199.266 2.815 4.298 6.82 6.027.953.412 1.697.658 2.277.842.957.305 1.828.262 2.516.159.767-.114 2.355-.963 2.688-1.893.333-.93.333-1.728.233-1.893-.099-.166-.365-.266-.763-.465z" />
      </svg>

      {/* Tooltip */}
      <span className={styles.wppTooltip}>¡Escríbenos!</span>
    </a>
  );
};

export default WhatsAppButton;