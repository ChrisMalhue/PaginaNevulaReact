// src/test/components/organisms/FormularioEvento.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioEvento } from '../../../components/organisms/FormularioEvento';

const escribir = (etiqueta, valor) =>
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
const enviar = () =>
  fireEvent.submit(screen.getByRole('button', { name: 'Agregar evento' }).closest('form'));

describe('FormularioEvento (organism)', () => {
  it('renderiza título, campos y botón; con Finalizado solo se deshabilita el link; una sola hora da error', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    render(<FormularioEvento onAgregar={onAgregar} />);
    expect(screen.getByRole('heading', { name: 'Agregar evento' })).toBeTruthy();
    expect(screen.getByLabelText('Local del evento')).toBeTruthy();
    expect(screen.getByLabelText('Estado')).toBeTruthy();
    expect(screen.getByLabelText('Imagen del evento')).toBeTruthy();
    expect(screen.getByLabelText('Hora de inicio').getAttribute('type')).toBe('time');
    expect(screen.getByLabelText('Hora de término').getAttribute('type')).toBe('time');
    expect(screen.getByLabelText('Género de música')).toBeTruthy();
    expect(screen.getByLabelText('Line-up').tagName).toBe('TEXTAREA');
    expect(screen.getByRole('button', { name: 'Agregar evento' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Cancelar' })).toBeNull();

    expect(screen.getByLabelText('Link para comprar entradas').disabled).toBeFalse();
    escribir('Estado', 'Finalizado');
    // Un evento finalizado también puede tener fecha; el link de entradas no tiene sentido
    expect(screen.getByLabelText('Fecha del evento').disabled).toBeFalse();
    expect(screen.getByLabelText('Link para comprar entradas').disabled).toBeTrue();

    // Solo una de las dos horas: error y no se agrega
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
    escribir('Fecha del evento', '2025-06-21'); // fecha pasada: válida en un evento Finalizado
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
      fecha: '2025-06-21',
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
    expect(sinOpcionales.fecha).toBeUndefined();
    expect(sinOpcionales.horaInicio).toBeUndefined();
    expect(sinOpcionales.genero).toBeUndefined();
    expect(sinOpcionales.lineup).toBeUndefined();
  });

  it('en modo edición carga los datos del evento, guarda con onGuardar conservando el id y permite cancelar', () => {
    const onGuardar = jasmine.createSpy('onGuardar');
    const onCancelar = jasmine.createSpy('onCancelar');
    const eventoEditando = {
      id: 5,
      imagen: '/assets/imagen-interna.webp', // imagen del proyecto: no es un link http
      alt: 'Evento 5',
      local: 'Club Viejo',
      estado: 'Finalizado',
      fecha: '2025-06-21',
      horaInicio: '22:00',
      horaTermino: '03:00',
      genero: 'House',
      lineup: ['DJ Uno', 'DJ Dos'],
    };
    render(<FormularioEvento eventoEditando={eventoEditando} onGuardar={onGuardar} onCancelar={onCancelar} />);

    // El formulario se carga con los datos del evento
    expect(screen.getByRole('heading', { name: 'Editar evento' })).toBeTruthy();
    expect(screen.getByLabelText('Local del evento').value).toBe('Club Viejo');
    expect(screen.getByLabelText('Fecha del evento').value).toBe('2025-06-21');
    expect(screen.getByLabelText('Género de música').value).toBe('House');
    expect(screen.getByLabelText('Line-up').value).toBe('DJ Uno\nDJ Dos');

    // Guardar con la imagen sin cambios (no es link http) no da error y conserva el id
    escribir('Local del evento', 'Club Nuevo');
    fireEvent.submit(screen.getByRole('button', { name: 'Guardar cambios' }).closest('form'));
    expect(onGuardar).toHaveBeenCalledWith(jasmine.objectContaining({
      id: 5,
      local: 'Club Nuevo',
      imagen: '/assets/imagen-interna.webp',
      fecha: '2025-06-21', // la fecha de un evento Finalizado no se pierde al editar
      horaInicio: '22:00',
      horaTermino: '03:00',
      genero: 'House',
      lineup: ['DJ Uno', 'DJ Dos'],
    }));

    // Cancelar avisa al padre
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onCancelar).toHaveBeenCalledTimes(1);
  });
});
