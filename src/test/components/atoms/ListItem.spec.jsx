// src/test/components/atoms/ListItem.spec.jsx
import { render, screen } from '@testing-library/react';
import { ListItem } from '../../../components/atoms/ListItem';

describe('ListItem (atom)', () => {
  it('renderiza un elemento li', () => {
    render(<ul><ListItem>Elemento</ListItem></ul>);
    expect(screen.getByRole('listitem')).toBeTruthy();
  });

  it('muestra el contenido recibido', () => {
    render(<ul><ListItem>Texto de prueba</ListItem></ul>);
    expect(screen.getByText('Texto de prueba')).toBeTruthy();
  });

  it('aplica la clase indicada', () => {
    render(<ul><ListItem className="item">Elemento</ListItem></ul>);
    expect(screen.getByRole('listitem')).toHaveClass('item');
  });
});
