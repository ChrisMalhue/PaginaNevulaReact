import { obtenerUsuarios } from './usuariosRegistrados';

const CLAVE = 'logueado';
const CLAVE_USUARIO = 'usuarioActivo';
const USUARIO_ADMIN = 'admin';

export function estaLogueado() {
  try {
    return localStorage.getItem(CLAVE) === 'true' && !!localStorage.getItem(CLAVE_USUARIO);
  } catch {
    return false;
  }
}

// nombre del usuario con la sesión iniciada (null si no hay sesión)
export function obtenerUsuarioActivo() {
  try {
    return localStorage.getItem(CLAVE_USUARIO);
  } catch {
    return null;
  }
}

// solo la cuenta "admin" puede agregar eventos
export function esAdmin() {
  const usuario = obtenerUsuarioActivo();
  return estaLogueado() && !!usuario && usuario.toLowerCase() === USUARIO_ADMIN;
}

export function iniciarSesion(usuario, contrasena) {
  // el usuario no distingue mayúsculas, la contraseña sí
  const encontrado = obtenerUsuarios().find(
    (u) => u.usuario.toLowerCase() === usuario.toLowerCase() && u.contrasena === contrasena
  );
  if (!encontrado) return false;

  localStorage.setItem(CLAVE, 'true');
  localStorage.setItem(CLAVE_USUARIO, encontrado.usuario);
  return true;
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE);
  localStorage.removeItem(CLAVE_USUARIO);
}