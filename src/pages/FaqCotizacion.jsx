import { Accordion } from 'react-bootstrap';
import { Caluga } from '../components/atoms/Caluga';
import Text from '../components/atoms/Text';
import { FormularioCotizacion } from '../components/organisms/FormularioCotizacion';
import { preguntasFrecuentes } from '../data/faq';
import '../styles/pages/FaqCotizacion.css';

function FaqCotizacion() {
  return (
    <>
      <Caluga Component="section" id="faq" className="seccion-faq" data-bs-theme="dark">
        <Caluga className="seccion-faq-contenido">
          <Text variant="h2" className="faq-titulo">Preguntas Frecuentes</Text>
          <Accordion>
            {preguntasFrecuentes.map(({ id, pregunta, respuesta }) => (
              <Accordion.Item key={id} eventKey={String(id)} className="faq-item">
                <Accordion.Header>{pregunta}</Accordion.Header>
                <Accordion.Body>{respuesta}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Caluga>
        <hr className="faq-divisor" />
      </Caluga>

      <FormularioCotizacion />
    </>
  );
}

export default FaqCotizacion;
