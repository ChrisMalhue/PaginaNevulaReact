import { Accordion } from 'react-bootstrap';
import { Caluga } from '../atoms/Caluga';
import Text from '../atoms/Text';
import { TarjetaFaq } from '../molecules/TarjetaFaq';
import '../../styles/components/organisms/SeccionFaq.css';

export function SeccionFaq({ preguntas = [] }) {
  return (
    // data-bs-theme="dark" le dice a Bootstrap que use sus colores oscuros
    <Caluga Component="section" id="faq" className="seccion-faq" data-bs-theme="dark">
      <Caluga className="seccion-faq-contenido">
        <Text variant="h2" className="faq-titulo">Preguntas Frecuentes</Text>
        {/* Sin defaultActiveKey: todas las preguntas empiezan cerradas */}
        <Accordion>
          {preguntas.map((pregunta) => (
            <TarjetaFaq key={pregunta.id} {...pregunta} />
          ))}
        </Accordion>
      </Caluga>
      {/* Linea divisora entre FAQ y cotizacion */}
      <hr className="faq-divisor" />
    </Caluga>
  );
}