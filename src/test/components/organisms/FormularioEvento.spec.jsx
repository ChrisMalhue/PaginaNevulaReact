// src/test/components/organisms/FormularioEvento.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioEvento } from '../../../components/organisms/FormularioEvento';

const escribir = (etiqueta, valor) =>
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
const enviar = () =>
  fireEvent.submit(screen.getByRole('button', { name: 'Agregar evento' }).closest('form'));

describe('FormularioEvento (organism)', () => {
  it('renderiza título, campos y botón; con estado Finalizado se deshabilitan fecha y link', () => {
    render(<FormularioEvento onAgregar={() => {}} />);
    expect(screen.getByRole('heading', { name: 'Agregar evento' })).toBeTruthy();
    expect(screen.getByLabelText('Local del evento')).toBeTruthy();
    expect(screen.getByLabelText('Estado')).toBeTruthy();
    expect(screen.getByLabelText('Imagen del evento')).toBeTruthy();
    expect(screen.getByLabelText('Hora de inicio').getAttribute('type')).toBe('time');
    expect(screen.getByLabelText('Hora de término').getAttribute('type')).toBe('time');
    expect(screen.getByLabelText('Género de música')).toBeTruthy();
    expect(screen.getByLabelText('Line-up').tagName).toBe('TEXTAREA');
    expect(screen.getByRole('button', { name: 'Agregar evento' })).toBeTruthy();

    expect(screen.getByLabelText('Fecha del evento').disabled).toBeFalse();
    escribir('Estado', 'Finalizado');
    expect(screen.getByLabelText('Fecha del evento').disabled).toBeTrue();
    expect(screen.getByLabelText('Link para comprar entradas').disabled).toBeTrue();
  });

  it('si solo se llena una de las dos horas muestra error y no agrega el evento', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    render(<FormularioEvento onAgregar={onAgregar} />);
    escribir('Estado', 'Finalizado');
    escribir('Local del evento', 'Club Test');
    escribir('Imagen del evento', 'https://imagenes.test/foto.jpg');
    escribir('Hora de inicio', '22:00');
    enviar();
    expect(screen.getByText('Indica también la hora de término.')).toBeTruthy();
    expect(onAgregar).not.toHaveBeenCalled();
  });

  it('con datos válidos llama a onAgregar con el evento; los campos opcionales solo se incluyen si se llenan', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    render(<FormularioEvento onAgregar={onAgregar} />);

    // Evento completo: horario, género y line-up (sin vacíos ni repetidos)
    escribir('Estado', 'Finalizado');
    escribir('Local del evento', 'Club Test');
    escribir('Imagen del evento', 'https://imagenes.test/foto.jpg');
    escribir('Hora de inicio', '22:00');
    escribir('Hora de término', '04:00');
    escribir('Género de música', 'Techno');
    escribir('Line-up', 'DJ Uno, DJ Dos\n dj uno \n\nDJ Tres');
    enviar();
    expect(onAgregar).toHaveBeenCalledWith(jasmine.objectContaining({
      local: 'Club Test',
      estado: 'Finalizado',
      imagen: 'https://imagenes.test/foto.jpg',
      alt: 'Evento en Club Test',
      horaInicio: '22:00',
      horaTermino: '04:00',
      genero: 'Techno',
      lineup: ['DJ Uno', 'DJ Dos', 'DJ Tres'],
    }));

    // Evento sin opcionales (el formulario se limpió tras el primer envío)
    escribir('Estado', 'Finalizado');
    escribir('Local del evento', 'Otro Club');
    escribir('Imagen del evento', 'https://imagenes.test/otra.jpg');
    enviar();
    const sinOpcionales = onAgregar.calls.mostRecent().args[0];
    expect(sinOpcionales.local).toBe('Otro Club');
    expect(sinOpcionales.horaInicio).toBeUndefined();
    expect(sinOpcionales.genero).toBeUndefined();
    expect(sinOpcionales.lineup).toBeUndefined();
  });
});
