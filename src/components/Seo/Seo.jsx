import { useEffect } from 'react';
import { site } from '../../config/site';

/**
 * Metadatos SEO por página.
 *
 * Aprovecha el hoisting nativo de <title>, <meta> y <link> de React 19: las
 * etiquetas declaradas acá se elevan al <head> cuando la página monta, dando a
 * cada ruta (/, /nosotros, /servicios, /contacto) su propio título, descripción
 * y canonical. Googlebot renderiza el JS, por lo que los lee correctamente.
 *
 * Nota: NO se declaran aquí las etiquetas Open Graph / Twitter. Esas viven
 * estáticas en index.html porque los scrapers de redes sociales (Facebook,
 * WhatsApp, X) no ejecutan JavaScript y no verían las inyectadas por React.
 *
 * @param {string} title       Título de la pestaña / resultado de búsqueda.
 * @param {string} description Meta description (~150-160 caracteres).
 * @param {string} path        Ruta absoluta del sitio (p. ej. "/nosotros").
 */
const Seo = ({ title, description, path = '/' }) => {
  const url = `${site.domain}${path}`;

  // El título se gestiona de forma imperativa (no con <title> declarativo) para
  // que se actualice también en la navegación cliente (SPA): con AnimatePresence
  // + Suspense, un <title> declarativo de React no reacciona de forma fiable al
  // cambiar de ruta, y además competiría con este efecto. Así document.title
  // queda correcto tanto en carga directa (Googlebot) como al navegar.
  useEffect(() => {
    document.title = title;
  }, [title]);

  // description y canonical sí son declarativos: React 19 los eleva al <head>
  // en la carga directa, que es como Googlebot indexa cada URL.
  return (
    <>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </>
  );
};

export default Seo;
