import { estadosEvento } from '../data/estadosEvento';

export const valoresIniciales = {
  local: '',
  estado: estadosEvento[0],
  fecha: '',
  imagen: '',
  link: '',
};

const esUrl = (texto) => /^https?:\/\/\S+$/i.test(texto.trim());

export function validarEvento(valores) {
  const errores = {};
  const esProgramado = valores.estado === 'Programado';

  // Local: obligatorio, mínimo 3 caracteres
  if (!valores.local.trim()) {
    errores.local = 'El local es obligatorio.';
  } else if (valores.local.trim().length < 3) {
    errores.local = 'El local debe tener al menos 3 caracteres.';
  }

  // Imagen: obligatoria y debe ser un link http(s)
  if (!valores.imagen.trim()) {
    errores.imagen = 'El link de la imagen es obligatorio.';
  } else if (!esUrl(valores.imagen)) {
    errores.imagen = 'Pega un link válido que empiece con http:// o https://';
  }

  // Fecha y link: solo se exigen en eventos Programados
  if (esProgramado) {
    if (!valores.fecha) {
      errores.fecha = 'La fecha es obligatoria para eventos programados.';
    } else {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (new Date(`${valores.fecha}T00:00:00`) < hoy) {
        errores.fecha = 'La fecha no puede ser anterior a hoy.';
      }
    }

    if (!valores.link.trim()) {
      errores.link = 'Los eventos programados necesitan un link de entradas.';
    } else if (!esUrl(valores.link)) {
      errores.link = 'Pega un link válido que empiece con http:// o https://';
    }
  }

  return errores;
}
