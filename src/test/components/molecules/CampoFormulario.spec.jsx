// src/test/components/molecules/CampoFormulario.spec.jsx
import { render, screen } from '@testing-library/react';
import { CampoFormulario } from '../../../components/molecules/CampoFormulario';

describe('CampoFormulario (molecule)', () => {
  it('renderiza la etiqueta asociada a un input', () => {
    render(<CampoFormulario id="nombre" etiqueta="Nombre" name="nombre" />);
    const input = screen.getByLabelText('Nombre');
    expect(input.tagName).toBe('INPUT');
    expect(input.getAttribute('type')).toBe('text');
  });

  it('renderiza un textarea cuando type es "textarea"', () => {
    render(<CampoFormulario id="detalles" etiqueta="Detalles" type="textarea" rows={3} />);
    const campo = screen.getByLabelText('Detalles');
    expect(campo.tagName).toBe('TEXTAREA');
    expect(campo.getAttribute('rows')).toBe('3');
  });

  it('muestra el mensaje de error y marca el campo como inválido', () => {
    render(<CampoFormulario id="correo" etiqueta="Correo" error="Correo inválido" />);
    expect(screen.getByText('Correo inválido')).toBeTruthy();
    expect(screen.getByLabelText('Correo')).toHaveClass('is-invalid');
  });
});
