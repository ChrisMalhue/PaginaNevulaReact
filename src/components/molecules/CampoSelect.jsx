import React from 'react';
import { Form } from 'react-bootstrap';

export function CampoSelect({ id, etiqueta, opciones = [], ...props }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Select {...props}>
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>{opcion}</option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}
