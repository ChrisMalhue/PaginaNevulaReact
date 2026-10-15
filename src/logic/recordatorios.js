// Un solo registro en localStorage: { "usuario": [idEvento, ...], ... }
const CLAVE = 'recordatoriosPorUsuario';

function leerTodo() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || {};
  } catch {
    return {};
  }
}

export function obtenerRecordatorios(usuario) {
  return leerTodo()[usuario.toLowerCase()] || [];
}

export function guardarRecordatorios(usuario, ids) {
  localStorage.setItem(CLAVE, JSON.stringify({ ...leerTodo(), [usuario.toLowerCase()]: ids }));
}
