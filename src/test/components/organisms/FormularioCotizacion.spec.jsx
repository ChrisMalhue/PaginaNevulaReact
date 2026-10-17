import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioCotizacion } from '../../../components/organisms/FormularioCotizacion';

const escribir = (etiqueta, valor) =>
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
const enviar = () =>
  fireEvent.submit(screen.getByRole('button', { name: 'Enviar solicitud' }).closest('form'));

describe('FormularioCotizacion (organism)', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('renderiza el título, los campos y el botón de envío', () => {
    render(<FormularioCotizacion />);
    expect(screen.getByRole('heading', { name: '¿Quieres cotizar?' })).toBeTruthy();
    expect(screen.getByLabelText('Nombre')).toBeTruthy();
    expect(screen.getByLabelText('Telefono')).toBeTruthy();
    expect(screen.getByLabelText('Fecha del evento')).toBeTruthy();
    expect(screen.getByLabelText('¿Qué necesitas para tu evento?')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Enviar solicitud' })).toBeTruthy();
  });

  it('al enviar vacío muestra errores de nombre, teléfono y fecha', () => {
    render(<FormularioCotizacion />);
    enviar();
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy();
    expect(screen.getByText('El teléfono es obligatorio.')).toBeTruthy();
    expect(screen.getByText('La fecha del evento es obligatoria.')).toBeTruthy();
  });

  it('con datos válidos guarda la cotización, avisa y limpia el formulario', () => {
    const alerta = spyOn(window, 'alert');
    render(<FormularioCotizacion />);
    escribir('Nombre', 'Juan Perez');
    escribir('Telefono', '+56912345678');
    escribir('Fecha del evento', '2099-12-31');
    enviar();
    expect(alerta).toHaveBeenCalledWith('Recibimos tu solicitud, te contactaremos en breve.');
    expect(JSON.parse(localStorage.getItem('cotizaciones'))[0].nombre).toBe('Juan Perez');
    expect(screen.getByLabelText('Nombre').value).toBe('');
  });
});