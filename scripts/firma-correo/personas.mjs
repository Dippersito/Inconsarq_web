/**
 * Datos de cada firma de correo. Agregar una entrada por persona.
 *
 * `avatarFuente` es la ruta al retrato original (src/assets); el generador lo recorta
 * en círculo y lo optimiza. `recorte` es la ventana cuadrada sobre ese original
 * (en píxeles del archivo fuente) que deja el rostro centrado con aire arriba.
 */
export const personas = [
  {
    slug: 'julissa-vitorino',
    nombre: 'Julissa',
    apellidos: 'Vitorino Becerra',
    cargo: 'Gerente General',
    email: 'jvitorino@inconsarq.com',
    tel: '+51 940 850 179',
    telHref: '+51940850179',
    direccion: 'Cerro Colorado, Arequipa &mdash; Per&uacute;',
    avatarFuente: 'src/assets/foto_julissa.png',
    recorte: { left: 270, top: 60, width: 1400, height: 1400 },
  },
];
