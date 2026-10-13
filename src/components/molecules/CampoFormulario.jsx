import { Form } from 'react-bootstrap';

export function CampoFormulario({ id, etiqueta, type = 'text', rows, error, ...props }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Control
        as={type === 'textarea' ? 'textarea' : 'input'}
        type={type === 'textarea' ? undefined : type}
        rows={rows}
        isInvalid={!!error}
        {...props}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}