import { Accordion } from 'react-bootstrap';

// Accordion.Item solo funciona dentro de un <Accordion> (lo pone SeccionFaq)
export function TarjetaFaq({ id, pregunta, respuesta }) {
  return (
    <Accordion.Item eventKey={String(id)} className="faq-item">
      <Accordion.Header>{pregunta}</Accordion.Header>
      <Accordion.Body>{respuesta}</Accordion.Body>
    </Accordion.Item>
  );
}
