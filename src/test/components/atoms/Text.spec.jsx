// src/test/components/atoms/Text.spec.jsx
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text (atom)', () => {
  it('renderiza un párrafo por defecto', () => {
    render(<Text>Hola</Text>);
    expect(screen.getByText('Hola').tagName).toBe('P');
  });

  it('usa la etiqueta indicada en variant', () => {
    render(<Text variant="h1">Título</Text>);
    expect(screen.getByRole('heading', { level: 1, name: 'Título' })).toBeTruthy();
  });

  it('aplica la clase indicada', () => {
    render(<Text variant="span" className="destacado">Texto</Text>);
    expect(screen.getByText('Texto')).toHaveClass('destacado');
  });
});
