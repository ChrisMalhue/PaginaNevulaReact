import { Accordion } from 'react-bootstrap';
import { Caluga } from '../components/atoms/Caluga';
import Text from '../components/atoms/Text';
import { FormularioCotizacion } from '../components/organisms/FormularioCotizacion';
import { preguntasFrecuentes } from '../data/faq';
import '../styles/components/organisms/SeccionFaq.css';

function FaqCotizacion() {
  return (
    <>
      {/* data-bs-theme="dark" le dice a Bootstrap que use sus colores oscuros */}
      <Caluga Component="section" id="faq" className="seccion-faq" data-bs-theme="dark">
        <Caluga className="seccion-faq-contenido">
          <Text variant="h2" className="faq-titulo">Preguntas Frecuentes</Text>
          {/* Sin defaultActiveKey: todas las preguntas empiezan cerradas */}
          <Accordion>
            {preguntasFrecuentes.map(({ id, pregunta, respuesta }) => (
              <Accordion.Item key={id} eventKey={String(id)} className="faq-item">
                <Accordion.Header>{pregunta}</Accordion.Header>
                <Accordion.Body>{respuesta}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Caluga>
        {/* Línea divisora entre FAQ y cotización */}
        <hr className="faq-divisor" />
      </Caluga>

      <FormularioCotizacion />
    </>
  );
}

export default FaqCotizacion;
