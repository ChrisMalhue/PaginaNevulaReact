import { Caluga } from '../components/atoms/Caluga';
import Text from '../components/atoms/Text';
import { Texts } from '../components/molecules/Texts';
import { beneficios } from '../data/beneficios';
import videoAniversario from '../assets/videos/video_aniversario.webm';
import '../styles/components/organisms/Presentacion.css';
import '../styles/components/organisms/SeccionBeneficios.css';

function Home() {
  return (
    <>
      {/* Presentación: video y texto de bienvenida */}
      <Caluga Component="section" id="quienes" className="presentacion">
        <Caluga className="presentacion-video-box">
          <video className="presentacion-video" autoPlay loop muted playsInline>
            <source src={videoAniversario} type="video/webm" />
          </video>
        </Caluga>
        <Caluga className="presentacion-content">
          <Texts
            items={[
              { text: 'Nevula', variant: 'h1', className: 'presentacion-title' },
              { text: 'Desde las profundidades del cosmos, entre destellos galácticos y frecuencias que viajan por el vacío...', variant: 'p', className: 'presentacion-text' },
              { text: 'Somos un grupo de DJ emergente chileno', variant: 'p', className: 'presentacion-highlight' },
            ]}
          />
        </Caluga>
      </Caluga>

      {/* Por qué elegirnos: una tarjeta por cada beneficio de data/beneficios.js */}
      <Caluga Component="section" id="elegirnos" className="beneficios">
        <Text variant="h2" className="beneficios-titulo">Por qué elegir a Nevula</Text>
        <Caluga className="beneficios-grid">
          {beneficios.map(({ id, icono: Icono, titulo, descripcion }) => (
            <Caluga key={id} className="tarjeta">
              {/* Icono es un componente de react-icons: toma su color del CSS (.tarjeta-icono) */}
              <Icono className="tarjeta-icono" aria-hidden="true" />
              <Texts
                items={[
                  { text: titulo, variant: 'p', className: 'tarjeta-titulo' },
                  { text: descripcion, variant: 'p', className: 'tarjeta-texto' },
                ]}
              />
            </Caluga>
          ))}
        </Caluga>
      </Caluga>
    </>
  );
}

export default Home;
