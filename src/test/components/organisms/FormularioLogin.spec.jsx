import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioLogin } from '../../../components/organisms/FormularioLogin';

describe('FormularioLogin (organism)', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('renderiza los campos de usuario y contraseña y el botón', () => {
    render(<FormularioLogin />);
    expect(screen.getByLabelText('Nombre de usuario')).toBeTruthy();
    expect(screen.getByLabelText('Contraseña')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeTruthy();
  });

  it('el campo de contraseña oculta lo que se escribe y ambos campos son obligatorios', () => {
    render(<FormularioLogin />);
    const contrasena = screen.getByLabelText('Contraseña');
    expect(contrasena.getAttribute('type')).toBe('password');
    expect(screen.getByLabelText('Nombre de usuario').required).toBeTrue();
    expect(contrasena.required).toBeTrue();
  });

  it('con credenciales incorrectas muestra una alerta y no inicia sesión', () => {
    const alerta = spyOn(window, 'alert');
    render(<FormularioLogin />);
    fireEvent.change(screen.getByLabelText('Nombre de usuario'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'incorrecta' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Iniciar sesión' }).closest('form'));
    expect(alerta).toHaveBeenCalledWith('Usuario o contraseña incorrecto');
    expect(localStorage.getItem('logueado')).toBeNull();
  });
});