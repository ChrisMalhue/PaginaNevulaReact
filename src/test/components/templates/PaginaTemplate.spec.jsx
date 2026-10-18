import { render, screen } from '@testing-library/react';
import { PaginaTemplate } from '../../../components/templates/PaginaTemplate';

describe('PaginaTemplate (template)', () => {
  it('renderiza una sección con el id indicado y el título como h2', () => {
    const { container } = render(<PaginaTemplate id="mi-pagina" titulo="Mi título" />);
    const seccion = container.querySelector('section');
    expect(seccion.getAttribute('id')).toBe('mi-pagina');
    expect(screen.getByRole('heading', { level: 2, name: 'Mi título' })).toBeTruthy();
  });

  it('muestra el contenido recibido por children dentro del contenedor', () => {
    const { container } = render(
      <PaginaTemplate claseContenido="contenido">
        <p>Contenido de la página</p>
      </PaginaTemplate>
    );
    const contenedor = container.querySelector('.contenido');
    expect(contenedor).toContainElement(screen.getByText('Contenido de la página'));
  });

  it('aplica las clases a la sección, al contenedor y al título', () => {
    const { container } = render(
      <PaginaTemplate
        titulo="Título"
        claseSeccion="seccion"
        claseContenido="contenido"
        claseTitulo="titulo"
      />
    );
    expect(container.querySelector('section')).toHaveClass('seccion');
    expect(container.querySelector('section > div')).toHaveClass('contenido');
    expect(screen.getByRole('heading', { name: 'Título' })).toHaveClass('titulo');
  });
});