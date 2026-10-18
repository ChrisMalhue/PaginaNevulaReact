// fecha de hoy en formato YYYY-MM-DD
export function hoyISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
}

// ejemplo: de '2026-12-31' a '31/12/2026'
export function formatearFecha(fecha) {
  const [anio, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${anio}`;
}

// un evento es próximo si está Programado y su fecha no ha pasado
export function esProximo({ estado, fecha }) {
  if (estado !== 'Programado') return false;
  if (!fecha) return true;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return new Date(`${fecha}T00:00:00`) >= hoy;
}