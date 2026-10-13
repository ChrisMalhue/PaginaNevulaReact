const CLAVE = 'cotizaciones';

export function obtenerCotizaciones() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
}

export function guardarCotizacion(valores) {
  const nueva = {
    id: Date.now(),
    ...valores,
    nombre: valores.nombre.trim(),
    detalles: valores.detalles.trim(),
  };
  localStorage.setItem(CLAVE, JSON.stringify([...obtenerCotizaciones(), nueva]));
  return nueva;
}