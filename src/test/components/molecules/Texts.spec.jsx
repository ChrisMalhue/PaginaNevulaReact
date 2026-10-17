// src/test/components/molecules/Texts.spec.jsx
import { render, screen } from '@testing-library/react';
import { Texts } from '../../../components/molecules/Texts';

describe('Texts (molecule)', () => {
  it('renderiza un texto por cada item', () => {
    render(<Texts items={[{ text: 'Uno' }, { text: 'Dos' }, { text: 'Tres' }]} />);
    expect(screen.getByText('Uno')).toBeTruthy();
    expect(screen.getByText('Dos')).toBeTruthy();
    expect(screen.getByText('Tres')).toBeTruthy();
  });

  it('respeta la etiqueta (variant) y la clase de cada item', () => {
    render(<Texts items={[{ text: 'Título', variant: 'h2', className: 'titulo' }]} />);
    const titulo = screen.getByRole('heading', { level: 2, name: 'Título' });
    expect(titulo).toHaveClass('titulo');
  });

  it('no renderiza nada cuando no hay items', () => {
    const { container } = render(<Texts />);
    expect(container.children.length).toBe(0);
  });
});
