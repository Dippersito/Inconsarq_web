/**
 * Single source of truth para datos del sitio.
 * Cualquier cambio (email, teléfono, redes, dirección) se hace UNA vez acá.
 */

export const site = {
  brand: {
    name: 'INCONSARQ',
    fullName: 'Ingeniería, Construcción y Arquitectura',
    tagline: 'Soluciones que brindan seguridad',
    description:
      'Empresa peruana especializada en geosintéticos, tuberías HDPE, supervisión de obras, expedientes técnicos y saneamiento físico-legal.',
  },

  contact: {
    representative: 'Julissa Vitorino',
    phone: '+51 940 850 179',
    phoneTel: '+51940850179', // sin espacios, para href="tel:"
    email: 'jvitorinob@inconsarq.com',
    location: {
      city: 'Arequipa',
      district: 'Cerro Colorado',
      country: 'Perú',
      address: 'Mz. D Lt. 4 Dpto. 3, Res. CASABELLA, Cerro Colorado, Arequipa, Perú',
      addressShort: 'Res. CASABELLA, Cerro Colorado, Arequipa',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Residencial+CASABELLA+Cerro+Colorado+Arequipa+Per%C3%BA',
    },
  },

  whatsapp: {
    number: '51940850179', // sin "+" ni espacios, para wa.me
    defaultMessage: '¡Hola! Me interesa conocer más sobre sus servicios.',
  },

  // INCONSARQ no tiene redes sociales activas (mayo 2026).
  // Si en el futuro abren cuenta, agregar la URL acá y restaurar el render en Footer.jsx.
  social: {},

  domain: 'https://inconsarq.com',
};
