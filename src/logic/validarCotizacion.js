export const valoresIniciales = { nombre: '', telefono: '', fecha: '', detalles: '' };

export function validarCotizacion(valores) {
  const errores = {};
  if (!valores.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio.';
  } else if (valores.nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.';
  } else if (!/^[A-Za-z\s]+$/.test(valores.nombre.trim())) {
    errores.nombre = 'El nombre solo puede tener letras.';
  }

  const tel = valores.telefono.replace(/[\s-]/g, '');
  if (!tel) {
    errores.telefono = 'El teléfono es obligatorio.';
  } else if (!/^(\+56|56)?9\d{8}$/.test(tel)) {
    errores.telefono = 'Ingresa un celular válido, ej: +56912345678.';
  }

  if (!valores.fecha) {
    errores.fecha = 'La fecha del evento es obligatoria.';
  } else {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (new Date(`${valores.fecha}T00:00:00`) < hoy) {
      errores.fecha = 'La fecha no puede ser anterior a hoy.';
    }
  }

  if (valores.detalles.length > 500) {
    errores.detalles = 'Máximo 500 caracteres.';
  }

  return errores;
}