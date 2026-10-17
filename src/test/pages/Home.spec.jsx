import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import { beneficios } from '../../data/beneficios';

describe('Home (page)', () => {
  it('renderiza el título de presentación', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1, name: 'Nevula' })).toBeTruthy();
    expect(screen.getByText('Somos un grupo de DJ emergente chileno')).toBeTruthy();
  });

  it('renderiza el video de presentación', () => {
    const { container } = render(<Home />);
    const video = container.querySelector('video');
    expect(video).toBeTruthy();
    expect(video.querySelector('source').getAttribute('type')).toBe('video/webm');
  });

  it('renderiza una tarjeta por cada beneficio', () => {
    const { container } = render(<Home />);
    expect(screen.getByRole('heading', { name: 'Por qué elegir a Nevula' })).toBeTruthy();
    expect(container.querySelectorAll('.tarjeta').length).toBe(beneficios.length);
    expect(screen.getByText(beneficios[0].titulo)).toBeTruthy();
  });
});