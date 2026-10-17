import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioRegistro } from '../../../components/organisms/FormularioRegistro';

const escribir = (etiqueta, valor) =>
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
const enviar = () =>
  fireEvent.submit(screen.getByRole('button', { name: 'Registrarse' }).closest('form'));

describe('FormularioRegistro (organism)', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('renderiza los cuatro campos y el botón', () => {
    render(<FormularioRegistro />);
    expect(screen.getByLabelText('Nombre de usuario')).toBeTruthy();
    expect(screen.getByLabelText('Correo')).toBeTruthy();
    expect(screen.getByLabelText('Contraseña')).toBeTruthy();
    expect(screen.getByLabelText('Repetir contraseña')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeTruthy();
  });

  it('al enviar vacío muestra los mensajes de error', () => {
    render(<FormularioRegistro />);
    enviar();
    expect(screen.getByText('El nombre de usuario es obligatorio.')).toBeTruthy();
    expect(screen.getByText('El correo es obligatorio.')).toBeTruthy();
    expect(screen.getByText('La contraseña es obligatoria.')).toBeTruthy();
    expect(screen.getByText('Repite la contraseña.')).toBeTruthy();
  });

  it('con datos válidos registra al usuario, avisa y llama a onRegistrado', () => {
    const alerta = spyOn(window, 'alert');
    const onRegistrado = jasmine.createSpy('onRegistrado');
    render(<FormularioRegistro onRegistrado={onRegistrado} />);
    escribir('Nombre de usuario', 'nuevo_usuario');
    escribir('Correo', 'nuevo@correo.com');
    escribir('Contraseña', 'clave1234');
    escribir('Repetir contraseña', 'clave1234');
    enviar();
    expect(alerta).toHaveBeenCalledWith('Registrado exitosamente!');
    expect(onRegistrado).toHaveBeenCalledTimes(1);
    const guardados = JSON.parse(localStorage.getItem('usuariosRegistrados'));
    expect(guardados[0].usuario).toBe('nuevo_usuario');
  });
});