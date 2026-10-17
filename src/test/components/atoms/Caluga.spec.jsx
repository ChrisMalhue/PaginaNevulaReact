import { render, screen } from '@testing-library/react';
import { Caluga } from '../../../components/atoms/Caluga';

describe('Caluga (atom)', () => {
  it('renderiza un div por defecto con su contenido', () => {
    render(<Caluga>Contenido</Caluga>);
    expect(screen.getByText('Contenido').tagName).toBe('DIV');
  });

  it('usa la etiqueta indicada en Component', () => {
    render(<Caluga Component="section">Sección</Caluga>);
    expect(screen.getByText('Sección').tagName).toBe('SECTION');
  });

  it('aplica className y pasa el resto de props', () => {
    render(<Caluga className="caja" id="mi-caja" data-testid="caja">X</Caluga>);
    const caja = screen.getByTestId('caja');
    expect(caja).toHaveClass('caja');
    expect(caja.getAttribute('id')).toBe('mi-caja');
  });
});