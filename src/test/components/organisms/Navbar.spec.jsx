// src/test/components/organisms/Navbar.spec.jsx
import { render, screen } from '@testing-library/react';
import NavBar from '../../../components/organisms/Navbar';

describe('Navbar (organism)', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('renderiza el logo y los enlaces de navegación', () => {
    render(<NavBar />);
    expect(screen.getByAltText('Nevula')).toBeTruthy();
    expect(screen.getByText('Home').getAttribute('href')).toBe('/#');
    expect(screen.getByText('FAQ').getAttribute('href')).toBe('/faqcotiza#faq');
    expect(screen.getByText('Cotizacion').getAttribute('href')).toBe('/faqcotiza#cotizacion');
  });

  it('sin sesión muestra el acceso a login y no muestra "Cerrar sesion"', () => {
    render(<NavBar />);
    expect(screen.getByLabelText('Iniciar sesión o registrarse').getAttribute('href')).toBe('/login');
    expect(screen.queryByText('Cerrar sesion')).toBeNull();
  });

  it('con sesión iniciada muestra "Cerrar sesion" y oculta el login', () => {
    localStorage.setItem('logueado', 'true');
    localStorage.setItem('usuarioActivo', 'admin');
    render(<NavBar />);
    expect(screen.getByText('Cerrar sesion')).toBeTruthy();
    expect(screen.queryByLabelText('Iniciar sesión o registrarse')).toBeNull();
  });
});
