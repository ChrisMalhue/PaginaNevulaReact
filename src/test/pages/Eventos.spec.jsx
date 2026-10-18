// src/test/pages/Eventos.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Eventos from '../../pages/Eventos';
import { eventos } from '../../data/eventos';
import { comoTrabajamos } from '../../data/comoTrabajamos';

const iniciarSesion = (usuario) => {
  localStorage.setItem('logueado', 'true');
  localStorage.setItem('usuarioActivo', usuario);
};

describe('Eventos (page)', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('sin sesión muestra la galería pero no recordatorios ni formulario', () => {
    render(<Eventos />);
    expect(screen.getByRole('heading', { name: 'Galería de eventos' })).toBeTruthy();
    expect(screen.getAllByAltText(/^Evento \d$/).length).toBe(eventos.length);
    expect(screen.queryByText('Mis recordatorios')).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Agregar evento' })).toBeNull();
    expect(screen.queryByRole('button', { name: /(Editar|Eliminar) evento/ })).toBeNull();
  });

  it('con un usuario normal muestra "Mis recordatorios" pero no el formulario', () => {
    iniciarSesion('maria');
    render(<Eventos />);
    expect(screen.getByText('Mis recordatorios')).toBeTruthy();
    expect(screen.getByText(/Aún no tienes recordatorios/)).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Agregar evento' })).toBeNull();
    expect(screen.queryByRole('button', { name: /(Editar|Eliminar) evento/ })).toBeNull();
  });

  it('con la cuenta admin puede eliminar, editar y agregar eventos (el nuevo con line-up aparece con "Ver detalles")', () => {
    iniciarSesion('admin');
    render(<Eventos />);
    expect(screen.getByRole('heading', { name: 'Agregar evento' })).toBeTruthy();
    expect(screen.getByText(comoTrabajamos.titulo)).toBeTruthy();

    spyOn(window, 'confirm').and.returnValue(true);
    expect(screen.getByText('Local: Casa FECH')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar evento Casa FECH' }));
    expect(screen.queryByText('Local: Casa FECH')).toBeNull();
    expect(screen.getAllByAltText(/^Evento \d$/).length).toBe(eventos.length - 1);

    fireEvent.click(screen.getByRole('button', { name: 'Editar evento Sala Mistral' }));
    expect(screen.getByRole('heading', { name: 'Editar evento' })).toBeTruthy();
    expect(screen.getByLabelText('Local del evento').value).toBe('Sala Mistral');
    fireEvent.change(screen.getByLabelText('Local del evento'), { target: { value: 'Sala Editada' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Guardar cambios' }).closest('form'));
    expect(screen.getByText('Local: Sala Editada')).toBeTruthy();
    expect(screen.queryByText('Local: Sala Mistral')).toBeNull();
    expect(screen.getByRole('heading', { name: 'Agregar evento' })).toBeTruthy();

    const botonesAntes = screen.getAllByRole('button', { name: 'Ver detalles' }).length;
    const escribir = (etiqueta, valor) =>
      fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
    escribir('Estado', 'Finalizado');
    escribir('Local del evento', 'Club Nuevo');
    escribir('Imagen del evento', 'https://imagenes.test/nuevo.jpg');
    escribir('Line-up', 'DJ Uno, DJ Dos');
    fireEvent.submit(screen.getByRole('button', { name: 'Agregar evento' }).closest('form'));
    expect(screen.getByText('Local: Club Nuevo')).toBeTruthy();
    expect(screen.getAllByRole('button', { name: 'Ver detalles' }).length).toBe(botonesAntes + 1);
  });
});
