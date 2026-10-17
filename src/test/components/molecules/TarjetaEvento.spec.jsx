// src/test/components/molecules/TarjetaEvento.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TarjetaEvento } from '../../../components/molecules/TarjetaEvento';

const eventoProgramado = {
  id: 7,
  imagen: 'evento.jpg',
  alt: 'Evento de prueba',
  local: 'Casa Test',
  estado: 'Programado',
  fecha: '2099-12-31',
  link: 'https://entradas.test/',
  horaInicio: '22:00',
  horaTermino: '04:00',
  lineup: ['DJ Uno', 'DJ Dos'],
  genero: 'Techno',
};

describe('TarjetaEvento (molecule)', () => {
  it('muestra imagen, local, estado y fecha, y el botón "Comprar ticket" solo en eventos Programados con link', () => {
    const { unmount } = render(<TarjetaEvento {...eventoProgramado} />);
    expect(screen.getByAltText('Evento de prueba')).toBeTruthy();
    expect(screen.getByText('Local: Casa Test')).toBeTruthy();
    expect(screen.getByText('Estado: Programado')).toBeTruthy();
    expect(screen.getByText('Fecha: 31/12/2099')).toBeTruthy();
    expect(screen.getByText('Comprar ticket').getAttribute('href')).toBe('https://entradas.test/');
    unmount();

    render(<TarjetaEvento {...eventoProgramado} estado="Finalizado" />);
    expect(screen.queryByText('Comprar ticket')).toBeNull();
    // Sin onEditar ni onEliminar (usuario que no es admin) no hay botones de administración
    expect(screen.queryByRole('button', { name: /(Editar|Eliminar) evento/ })).toBeNull();
  });

  it('llama a onToggleRecordatorio con la campanita, a onEditar con el botón de editar y a onEliminar solo si el admin confirma', () => {
    const onToggle = jasmine.createSpy('onToggle');
    const onEditar = jasmine.createSpy('onEditar');
    const onEliminar = jasmine.createSpy('onEliminar');
    const confirmar = spyOn(window, 'confirm');
    render(
      <TarjetaEvento
        {...eventoProgramado}
        onToggleRecordatorio={onToggle}
        onEditar={onEditar}
        onEliminar={onEliminar}
      />
    );

    screen.getByLabelText('Recordarme este evento').click();
    expect(onToggle).toHaveBeenCalledWith(7);

    screen.getByRole('button', { name: 'Editar evento Casa Test' }).click();
    expect(onEditar).toHaveBeenCalledWith(7);

    // Si cancela la confirmación no se elimina
    confirmar.and.returnValue(false);
    screen.getByRole('button', { name: 'Eliminar evento Casa Test' }).click();
    expect(onEliminar).not.toHaveBeenCalled();

    // Si confirma, se elimina con el id del evento
    confirmar.and.returnValue(true);
    screen.getByRole('button', { name: 'Eliminar evento Casa Test' }).click();
    expect(onEliminar).toHaveBeenCalledWith(7);
  });

  it('despliega horario, line-up y género con "Ver detalles"; sin esos datos no hay botón', () => {
    const { unmount } = render(<TarjetaEvento {...eventoProgramado} />);
    // Al inicio los detalles están ocultos
    const boton = screen.getByRole('button', { name: 'Ver detalles' });
    expect(boton.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByText('DJ Uno')).toBeNull();
    // Al presionar se muestran
    fireEvent.click(boton);
    expect(screen.getByRole('button', { name: 'Ocultar detalles' }).getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Horario: 22:00 – 04:00')).toBeTruthy();
    expect(screen.getByText('Line-up')).toBeTruthy();
    expect(screen.getByText('DJ Uno')).toBeTruthy();
    expect(screen.getByText('DJ Dos')).toBeTruthy();
    expect(screen.getByText('Género de Música: Techno')).toBeTruthy();
    unmount();

    // Sin horario, line-up ni género no hay botón
    const sinDetalles = render(<TarjetaEvento id={8} imagen="x.jpg" alt="Sin detalles" local="Club" estado="Finalizado" />);
    expect(screen.queryByRole('button', { name: 'Ver detalles' })).toBeNull();
    sinDetalles.unmount();

    // Con solo género el botón sí aparece
    render(<TarjetaEvento id={9} imagen="x.jpg" alt="Solo género" local="Club" estado="Finalizado" genero="House" />);
    expect(screen.getByRole('button', { name: 'Ver detalles' })).toBeTruthy();
  });
});
