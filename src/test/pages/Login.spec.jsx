import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../pages/Login';

describe('Login (page)', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('renderiza el título y las dos pestañas', () => {
    render(<Login />);
    expect(screen.getByRole('heading', { name: 'Mi cuenta' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Iniciar sesión' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Registrarse' })).toBeTruthy();
  });

  it('muestra la pestaña "Iniciar sesión" seleccionada al comienzo', () => {
    render(<Login />);
    expect(screen.getByRole('tab', { name: 'Iniciar sesión' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('tab', { name: 'Registrarse' }).getAttribute('aria-selected')).toBe('false');
  });

  it('al hacer click en "Registrarse" cambia de pestaña y muestra el formulario de registro', () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('tab', { name: 'Registrarse' }));
    expect(screen.getByRole('tab', { name: 'Registrarse' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByLabelText('Repetir contraseña')).toBeTruthy();
  });
});