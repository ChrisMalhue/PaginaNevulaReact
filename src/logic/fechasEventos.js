// Fecha de hoy en formato YYYY-MM-DD usando la hora local (para el min del input date)
export function hoyISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
}

// De '2026-12-31' a '31/12/2026'
export function formatearFecha(fecha) {
  const [anio, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${anio}`;
}

// Un evento es "próximo" si está Programado y su fecha (si la tiene) no ha pasado
export function esProximo({ estado, fecha }) {
  if (estado !== 'Programado') return false;
  if (!fecha) return true;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return new Date(`${fecha}T00:00:00`) >= hoy;
}
