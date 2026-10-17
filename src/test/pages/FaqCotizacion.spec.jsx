import { render, screen, fireEvent } from '@testing-library/react';
import FaqCotizacion from '../../pages/FaqCotizacion';
import { preguntasFrecuentes } from '../../data/faq';

describe('FaqCotizacion (page)', () => {
  it('renderiza el título de preguntas frecuentes', () => {
    render(<FaqCotizacion />);
    expect(screen.getByRole('heading', { name: 'Preguntas Frecuentes' })).toBeTruthy();
  });

  it('renderiza todas las preguntas del archivo de datos, cerradas al inicio', () => {
    render(<FaqCotizacion />);
    preguntasFrecuentes.forEach(({ pregunta }) => {
      const boton = screen.getByRole('button', { name: pregunta });
      expect(boton.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('al hacer click en una pregunta se abre su respuesta, y el formulario de cotización está presente', () => {
    render(<FaqCotizacion />);
    const boton = screen.getByRole('button', { name: preguntasFrecuentes[0].pregunta });
    fireEvent.click(boton);
    expect(boton.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByRole('heading', { name: '¿Quieres cotizar?' })).toBeTruthy();
  });
});