// src/test/pages/Eventos.spec.jsx
import { render, screen } from '@testing-library/react';
import Eventos from '../../pages/Eventos';
import { comoTrabajamos } from '../../data/comoTrabajamos';
import { eventos } from '../../data/eventos';

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
  });

  it('con un usuario normal muestra "Mis recordatorios" pero no el formulario', () => {
    iniciarSesion('maria');
    render(<Eventos />);
    expect(screen.getByText('Mis recordatorios')).toBeTruthy();
    expect(screen.getByText(/Aún no tienes recordatorios/)).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Agregar evento' })).toBeNull();
  });

  it('con la cuenta admin muestra además el formulario para agregar eventos', () => {
    iniciarSesion('admin');
    render(<Eventos />);
    expect(screen.getByRole('heading', { name: 'Agregar evento' })).toBeTruthy();
    expect(screen.getByText(comoTrabajamos.titulo)).toBeTruthy();
  });
});
