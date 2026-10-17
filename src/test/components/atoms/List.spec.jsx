import { render, screen } from '@testing-library/react';
import { List } from '../../../components/atoms/List';

describe('List (atom)', () => {
  it('renderiza una lista desordenada (ul) por defecto', () => {
    render(<List><li>Uno</li></List>);
    expect(screen.getByRole('list').tagName).toBe('UL');
  });

  it('renderiza una lista numerada cuando Component es "ol"', () => {
    render(<List Component="ol"><li>Uno</li></List>);
    expect(screen.getByRole('list').tagName).toBe('OL');
  });

  it('aplica className y muestra sus hijos', () => {
    render(<List className="mi-lista"><li>Uno</li><li>Dos</li></List>);
    expect(screen.getByRole('list')).toHaveClass('mi-lista');
    expect(screen.getAllByRole('listitem').length).toBe(2);
  });
});