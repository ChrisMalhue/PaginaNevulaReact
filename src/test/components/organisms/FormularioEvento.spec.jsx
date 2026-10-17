// src/test/components/organisms/FormularioEvento.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioEvento } from '../../../components/organisms/FormularioEvento';

const escribir = (etiqueta, valor) =>
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
const enviar = () =>
  fireEvent.submit(screen.getByRole('button', { name: 'Agregar evento' }).closest('form'));

describe('FormularioEvento (organism)', () => {
  it('renderiza el título, los campos y el botón', () => {
    render(<FormularioEvento onAgregar={() => {}} />);
    expect(screen.getByRole('heading', { name: 'Agregar evento' })).toBeTruthy();
    expect(screen.getByLabelText('Local del evento')).toBeTruthy();
    expect(screen.getByLabelText('Estado')).toBeTruthy();
    expect(screen.getByLabelText('Imagen del evento')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Agregar evento' })).toBeTruthy();
  });

  it('al cambiar el estado a Finalizado se deshabilitan fecha y link', () => {
    render(<FormularioEvento onAgregar={() => {}} />);
    expect(screen.getByLabelText('Fecha del evento').disabled).toBeFalse();
    escribir('Estado', 'Finalizado');
    expect(screen.getByLabelText('Fecha del evento').disabled).toBeTrue();
    expect(screen.getByLabelText('Link para comprar entradas').disabled).toBeTrue();
  });

  it('con datos válidos llama a onAgregar con el evento nuevo', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    render(<FormularioEvento onAgregar={onAgregar} />);
    escribir('Estado', 'Finalizado');
    escribir('Local del evento', 'Club Test');
    escribir('Imagen del evento', 'https://imagenes.test/foto.jpg');
    enviar();
    expect(onAgregar).toHaveBeenCalledWith(jasmine.objectContaining({
      local: 'Club Test',
      estado: 'Finalizado',
      imagen: 'https://imagenes.test/foto.jpg',
      alt: 'Evento en Club Test',
    }));
  });
});
