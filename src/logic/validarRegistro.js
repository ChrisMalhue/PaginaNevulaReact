export const valoresIniciales = { usuario: '', correo: '', contrasena: '', repetir: '' };

export function validarRegistro(valores, existentes = []) {
  const errores = {};
  const usuario = valores.usuario.trim();
  const correo = valores.correo.trim().toLowerCase();

  // Usuario: obligatorio, 3 a 20 caracteres, sin espacios, único
  if (!usuario) {
    errores.usuario = 'El nombre de usuario es obligatorio.';
  } else if (usuario.length < 3 || usuario.length > 20) {
    errores.usuario = 'Debe tener entre 3 y 20 caracteres.';
  } else if (!/^[A-Za-z0-9_.]+$/.test(usuario)) {
    errores.usuario = 'Solo letras, números, punto y guion bajo (sin espacios).';
  } else if (existentes.some((u) => u.usuario.toLowerCase() === usuario.toLowerCase())) {
    errores.usuario = 'Ese nombre de usuario ya está en uso.';
  }

  // Correo: obligatorio, formato válido, único
  if (!correo) {
    errores.correo = 'El correo es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) {
    errores.correo = 'Ingresa un correo válido, ej: nombre@correo.com.';
  } else if (existentes.some((u) => u.correo === correo)) {
    errores.correo = 'Ese correo ya está registrado.';
  }

  // Contraseña: mínimo 8, sin espacios, con letra y número
  if (!valores.contrasena) {
    errores.contrasena = 'La contraseña es obligatoria.';
  } else if (valores.contrasena.length < 8) {
    errores.contrasena = 'Debe tener al menos 8 caracteres.';
  } else if (/\s/.test(valores.contrasena)) {
    errores.contrasena = 'No puede tener espacios.';
  } else if (!/[A-Za-z]/.test(valores.contrasena) || !/\d/.test(valores.contrasena)) {
    errores.contrasena = 'Debe incluir al menos una letra y un número.';
  }

  // Repetir contraseña: obligatoria e igual a la anterior
  if (!valores.repetir) {
    errores.repetir = 'Repite la contraseña.';
  } else if (valores.repetir !== valores.contrasena) {
    errores.repetir = 'Las contraseñas no coinciden.';
  }

  return errores;
}