import { usuarios } from '../data/usuarios';

const CLAVE = 'usuariosRegistrados';

function obtenerRegistrados() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
}

// usuarios de prueba (data/usuarios.js) + los que se registraron desde la página
export function obtenerUsuarios() {
  return [...usuarios, ...obtenerRegistrados()];
}

export function registrarUsuario({ usuario, correo, contrasena }) {
  const nuevo = {
    usuario: usuario.trim(),
    correo: correo.trim().toLowerCase(),
    contrasena,
  };
  localStorage.setItem(CLAVE, JSON.stringify([...obtenerRegistrados(), nuevo]));
  return nuevo;
}