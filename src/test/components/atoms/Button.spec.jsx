// src/test/components/atoms/Button.spec.jsx
import { render, screen } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Button Component', () => {
  it('renderiza el botón correctamente', () => {
    render(<Button>Haz click</Button>);
    expect(screen.getByText('Haz click')).toBeTruthy();
  });

  it('aplica los props correctamente', () => {
    render(<Button variant="primary">Haz click</Button>);
    expect(screen.getByText('Haz click')).toHaveClass('btn-primary');
  });
});
