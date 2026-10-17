import { render, screen } from '@testing-library/react';
import Link from '../../../components/atoms/Link';

describe('Link (atom)', () => {
  it('renderiza un enlace con su texto', () => {
    render(<Link href="/inicio">Ir al inicio</Link>);
    expect(screen.getByRole('link', { name: 'Ir al inicio' })).toBeTruthy();
  });

  it('asigna el href indicado', () => {
    render(<Link href="/eventos">Eventos</Link>);
    expect(screen.getByText('Eventos').getAttribute('href')).toBe('/eventos');
  });

  it('aplica className y pasa otras props como target', () => {
    render(<Link href="https://ejemplo.cl" className="enlace" target="_blank">Externo</Link>);
    const enlace = screen.getByText('Externo');
    expect(enlace).toHaveClass('enlace');
    expect(enlace.getAttribute('target')).toBe('_blank');
  });
});