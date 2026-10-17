// src/test/components/organisms/Footer.spec.jsx
import { render, screen } from '@testing-library/react';
import { Footer } from '../../../components/organisms/Footer';

const props = {
  logo: 'logo.png',
  enlaces: [
    { label: 'Como trabajamos', href: '/eventos#trabajamos' },
    { label: 'Preguntas Frecuentes', href: '/faqcotiza#faq' },
  ],
  contactos: [
    { icono: <i />, texto: '+56911111111' },
    { icono: <i />, texto: 'correo@test.cl' },
  ],
  redes: [{ nombre: 'Instagram', icono: 'ig.png', href: 'https://instagram.com/test' }],
};

describe('Footer (organism)', () => {
  it('renderiza el logo y el título de ayuda dentro de un footer', () => {
    const { container } = render(<Footer {...props} />);
    expect(container.querySelector('footer')).toBeTruthy();
    expect(screen.getByAltText('Nebula')).toBeTruthy();
    expect(screen.getByText('¿Necesitas ayuda?')).toBeTruthy();
  });

  it('renderiza los enlaces y los datos de contacto recibidos', () => {
    render(<Footer {...props} />);
    expect(screen.getByText('Como trabajamos').getAttribute('href')).toBe('/eventos#trabajamos');
    expect(screen.getByText('Preguntas Frecuentes').getAttribute('href')).toBe('/faqcotiza#faq');
    expect(screen.getByText('+56911111111')).toBeTruthy();
    expect(screen.getByText('correo@test.cl')).toBeTruthy();
  });

  it('renderiza las redes sociales como enlaces externos', () => {
    render(<Footer {...props} />);
    const enlace = screen.getByAltText('Instagram').closest('a');
    expect(enlace.getAttribute('href')).toBe('https://instagram.com/test');
    expect(enlace.getAttribute('target')).toBe('_blank');
  });
});
