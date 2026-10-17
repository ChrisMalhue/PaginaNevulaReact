import { render, screen } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Button (atom)', () => {
  it('renderiza el botón con su texto', () => {
    render(<Button>Haz click</Button>);
    expect(screen.getByText('Haz click')).toBeTruthy();
  });

  it('aplica la variante de Bootstrap como clase', () => {
    render(<Button variant="primary">Haz click</Button>);
    expect(screen.getByText('Haz click')).toHaveClass('btn-primary');
  });

  it('ejecuta onClick al hacer click', () => {
    const onClick = jasmine.createSpy('onClick');
    render(<Button onClick={onClick}>Enviar</Button>);
    screen.getByText('Enviar').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});