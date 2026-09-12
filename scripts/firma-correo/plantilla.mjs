// Generador de firmas de correo INCONSARQ.
// Una sola fuente -> HTML para pegar en el cliente de correo + PNG renderizado.

export const BRAND = {
  terracota: '#c64d27',
  terracotaOsc: '#a63d1c',
  negro: '#0f0f0f',
  tinta: '#16130f',
  gris: '#6f6a64',
  linea: '#e4dfd8',
  crema: '#ffffff',
  tagline: 'Soluciones que brindan seguridad',
  web: 'inconsarq.com',
  dominio: 'https://inconsarq.com',
};

const font = "'Inter','Segoe UI',Helvetica,Arial,sans-serif";

/** @param {{nombre:string,apellidos:string,cargo:string,email:string,tel:string,telHref:string,direccion:string,avatar:string,logo:string}} p */
export function firmaHTML(p) {
  // La etiqueta va alineada a la derecha para que los valores caigan en una
  // sola columna, sin importar que "Web" y "Dirección" midan distinto.
  const dato = (etiqueta, contenido) => `
              <tr>
                <td style="padding:0 13px 0 0;vertical-align:top;text-align:right;white-space:nowrap;">
                  <span style="font-family:${font};font-size:9.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${BRAND.terracota};line-height:20px;">${etiqueta}</span>
                </td>
                <td style="padding:0;vertical-align:top;white-space:nowrap;">
                  <span style="font-family:${font};font-size:12.5px;color:${BRAND.tinta};line-height:20px;">${contenido}</span>
                </td>
              </tr>`;

  const link = (href, txt, color = BRAND.tinta) =>
    `<a href="${href}" style="color:${color};text-decoration:none;">${txt}</a>`;

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:672px;background:${BRAND.crema};border:1px solid ${BRAND.linea};border-left:5px solid ${BRAND.terracota};">
  <tr>
    <td style="padding:22px 26px 21px 25px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <!-- Retrato -->
          <td style="width:96px;padding:0;vertical-align:middle;">
            <img src="${p.avatar}" width="96" height="96" alt="${p.nombre} ${p.apellidos}" style="display:block;width:96px;height:96px;border:0;">
          </td>
          <td style="width:22px;">&nbsp;</td>

          <!-- Identidad -->
          <td style="padding:0;vertical-align:middle;">
            <div style="font-family:${font};font-size:23px;font-weight:300;color:${BRAND.tinta};line-height:1.12;letter-spacing:-.01em;white-space:nowrap;">${p.nombre}</div>
            <div style="font-family:${font};font-size:23px;font-weight:700;color:${BRAND.terracota};line-height:1.12;letter-spacing:-.01em;white-space:nowrap;">${p.apellidos}</div>
            <div style="width:30px;height:2px;background:${BRAND.terracota};margin:9px 0 8px;font-size:0;line-height:0;">&nbsp;</div>
            <div style="font-family:${font};font-size:10px;font-weight:600;letter-spacing:.16em;color:${BRAND.gris};text-transform:uppercase;">${p.cargo}</div>
          </td>
          <td style="width:24px;">&nbsp;</td>

          <!-- Divisor -->
          <td style="width:1px;background:${BRAND.linea};font-size:0;line-height:0;">&nbsp;</td>
          <td style="width:24px;">&nbsp;</td>

          <!-- Contacto -->
          <td style="padding:0;vertical-align:middle;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              ${dato('Tel&eacute;fono', link(`tel:${p.telHref}`, p.tel))}
              ${dato('E-mail', link(`mailto:${p.email}`, p.email))}
              ${dato('Web', link(BRAND.dominio, BRAND.web))}
              ${dato('Direcci&oacute;n', p.direccion)}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Banda de marca -->
  <tr>
    <td style="background:${BRAND.negro};padding:12px 26px 12px 25px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;">
        <tr>
          <td style="vertical-align:middle;padding:0;">
            <a href="${BRAND.dominio}" style="text-decoration:none;"><img src="${p.logo}" width="134" height="49" alt="INCONSARQ" style="display:block;width:134px;height:49px;border:0;"></a>
          </td>
          <td style="vertical-align:middle;text-align:right;padding:0;">
            <span style="font-family:${font};font-size:11px;font-weight:500;letter-spacing:.11em;color:#b9b2aa;text-transform:uppercase;">${BRAND.tagline}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}
