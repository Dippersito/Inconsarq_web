/**
 * Catálogo único de servicios de INCONSARQ.
 * Lo usan la página de Servicios (detalle) y el formulario de contacto (lista
 * "Servicio de interés"). Agregar o renombrar un servicio se hace UNA vez acá;
 * el ícono y la foto de cada uno se asignan por `id` en DynamicServices.jsx.
 *
 * El orden importa: es el orden en que se muestran (minería primero).
 */

export const services = [
  {
    id: 'geosinteticos',
    title: 'Geosintéticos',
    tag: 'Minería',
    desc: 'Expertos en la implementación de sistemas de contención y protección para el sector minero y gubernamental.',
    items: ['Pads de lixiviación y Relaveras', 'Reservorios y Rellenos sanitarios', 'Sistemas de contención de tanques'],
  },
  {
    id: 'miscelaneos',
    title: 'Servicios Misceláneos',
    tag: 'Industrial',
    desc: 'Soluciones integrales en metalmecánica para la fabricación y conservación de componentes industriales de acero.',
    items: ['Fabricación de Spool', 'Fabricación de Estructuras de Acero', 'Mantenimiento y pintado'],
  },
  {
    id: 'hdpe',
    title: 'Tuberías HDPE',
    tag: 'Instalaciones',
    desc: 'Suministramos e instalamos soluciones de polietileno de alta densidad, la opción más versátil y duradera para el transporte de fluidos críticos.',
    items: ['Termofusión certificada', 'Redes de alcantarillado y gas', 'Fabricación de accesorios'],
  },
  {
    id: 'consultoria',
    title: 'Asesoramiento y Consultoría',
    tag: 'Consultoría',
    desc: 'Acompañamiento constante y especializado para garantizar la satisfacción del cliente.',
    items: ['Ingeniería y Arquitectura', 'Consultoría para Minería', 'Gestión de proyectos Estatales'],
  },
  {
    id: 'ejecucion',
    title: 'Ejecución Integral de Proyectos',
    tag: 'Construcción',
    desc: 'Gestionamos sus obras de forma integral, desde la concepción del diseño hasta la entrega final, adaptándonos a las necesidades específicas de cada cliente.',
    items: ['Edificación y Obras Civiles', 'Paisajismo y áreas verdes', 'Diseño de Sistemas de estabilidad de taludes'],
  },
  {
    id: 'supervision',
    title: 'Supervisión de Obras',
    tag: 'Control',
    desc: 'Especialistas en la gestión y control de proyectos bajo los más altos estándares de rigor técnico.',
    items: ['Supervisión de obras civiles', 'Gestión y aseguramiento de calidad', 'Protocolos de seguridad y protección ambiental'],
  },
  {
    id: 'topografia',
    title: 'Levantamiento Topográfico',
    tag: 'Topografía',
    desc: 'Garantizamos precisión y efectividad en la toma de datos mediante tecnología de vanguardia, optimizando tiempos de ejecución en cada proyecto.',
    items: ['Fotogrametría con Drones', 'GPS Diferencial y Estaciones Totales', 'Certificación de áreas y metrados'],
  },
  {
    id: 'expedientes',
    title: 'Expedientes Técnicos',
    tag: 'Documentación',
    desc: 'Brindamos asesoría integral en el desarrollo de procesos técnicos, implementando metodologías eficientes para la elaboración de documentación estratégica.',
    items: ['Fichas y perfiles técnicos', "Elaboración de TDR's", 'Metodologías de gestión eficiente'],
  },
  {
    id: 'saneamiento',
    title: 'Saneamiento Físico-Legal',
    tag: 'Legal',
    desc: 'Brindamos seguridad jurídica y técnica a sus activos mediante profesionales especializados en la regularización integral de inmuebles urbanos, prediales y rústicos.',
    items: ['Independización y subdivisión', 'Rectificación de áreas y linderos', 'Habilitaciones Urbanas y Reglamentos Internos'],
  },
];
