import { render, screen } from '@testing-library/react';
import { TarjetaEvento } from '../../../components/molecules/TarjetaEvento';

const eventoProgramado = {
  id: 7,
  imagen: 'evento.jpg',
  alt: 'Evento de prueba',
  local: 'Casa Test',
  estado: 'Programado',
  fecha: '2099-12-31',
  link: 'https://entradas.test/',
};

describe('TarjetaEvento (molecule)', () => {
  it('muestra imagen, local, estado y fecha formateada', () => {
    render(<TarjetaEvento {...eventoProgramado} />);
    expect(screen.getByAltText('Evento de prueba')).toBeTruthy();
    expect(screen.getByText('Local: Casa Test')).toBeTruthy();
    expect(screen.getByText('Estado: Programado')).toBeTruthy();
    expect(screen.getByText('Fecha: 31/12/2099')).toBeTruthy();
  });

  it('muestra el botón "Comprar ticket" solo en eventos Programados con link', () => {
    const { unmount } = render(<TarjetaEvento {...eventoProgramado} />);
    expect(screen.getByText('Comprar ticket').getAttribute('href')).toBe('https://entradas.test/');
    unmount();

    render(<TarjetaEvento {...eventoProgramado} estado="Finalizado" />);
    expect(screen.queryByText('Comprar ticket')).toBeNull();
  });

  it('llama a onToggleRecordatorio con el id al presionar la campanita', () => {
    const onToggle = jasmine.createSpy('onToggle');
    render(<TarjetaEvento {...eventoProgramado} onToggleRecordatorio={onToggle} />);
    screen.getByLabelText('Recordarme este evento').click();
    expect(onToggle).toHaveBeenCalledWith(7);
  });
});