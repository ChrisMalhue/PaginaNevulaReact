import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image (atom)', () => {
  it('renderiza una imagen con el alt indicado', () => {
    render(<Image src="foto.jpg" alt="Una foto" />);
    expect(screen.getByRole('img', { name: 'Una foto' })).toBeTruthy();
  });

  it('asigna el atributo src', () => {
    render(<Image src="foto.jpg" alt="Una foto" />);
    expect(screen.getByAltText('Una foto').getAttribute('src')).toBe('foto.jpg');
  });

  it('aplica la clase indicada', () => {
    render(<Image src="foto.jpg" alt="Una foto" className="mi-imagen" />);
    expect(screen.getByAltText('Una foto')).toHaveClass('mi-imagen');
  });
});