import { Reveal } from '../../../components/Animation/Reveal';
import { MapPin } from 'lucide-react';
import styles from './WhoWeAre.module.css';

const STATS = [
  { value: '+10', label: 'Años de experiencia' },
  { value: '+120', label: 'Proyectos completados' },
];

const WhoWeAre = () => {
  return (
    <section className={styles.whoSection}>
      <div className="container">
        
        {/* ── TÍTULO CENTRADO ── */}
        <div className={styles.headerContent}>
          <Reveal width="100%">
            <span className={styles.sectionLabel}>Nuestra Esencia</span>
            <h2 className={styles.heading}>
              Expertos en Ingeniería<br />
              <em>y Construcción</em>
            </h2>
            <div className={styles.divider} />
          </Reveal>
        </div>

        {/* ── CONTENIDO EN DOS COLUMNAS ── */}
        <div className={styles.whoGrid}>
          
          {/* ── IMAGEN (Izquierda) ── */}
          <div className={styles.imageCol}>
            <Reveal>
              <div className={styles.imageFrame}>
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop"
                  alt="Equipo INCONSARQ"
                  className={styles.whoImage}
                />
                <div className={styles.imageOverlay} />
                <div className={styles.locationTag}>
                  <MapPin size={13} />
                  <span>Arequipa, Perú</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── TEXTO Y ESTADÍSTICAS (Derecha) ── */}
          <div className={styles.textCol}>
            <Reveal delay={0.2}>
              <p className={styles.paragraph}>
                Somos una empresa de servicios generales que cuenta con profesionales altamente
                calificados y comprometidos con nuestros clientes a fin de lograr resultados óptimos.
              </p>
              <p className={styles.paragraph}>
                En <strong>INCONSARQ</strong> no solo edificamos estructuras; forjamos relaciones
                duraderas basadas en la confianza y la excelencia técnica. Desde nuestros inicios en
                Arequipa, hemos expandido nuestra visión para abarcar proyectos integrales en todo
                el Perú.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className={styles.statsGrid}>
                {STATS.map((s) => (
                  <div key={s.label} className={styles.statCard}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;