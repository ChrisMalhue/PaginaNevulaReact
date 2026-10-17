import { estadosEvento } from '../data/estadosEvento';

export const valoresIniciales = {
  local: '',
  estado: estadosEvento[0],
  fecha: '',
  imagen: '',
  link: '',
  horaInicio: '',
  horaTermino: '',
  genero: '',
  lineup: '',
};

const esUrl = (texto) => /^https?:\/\/\S+$/i.test(texto.trim());
const esHora = (texto) => /^([01]\d|2[0-3]):[0-5]\d$/.test(texto);

const MAX_ARTISTAS = 30;
const MAX_GENERO = 50;

// De "DJ Uno, DJ Dos" o un nombre por línea a ['DJ Uno', 'DJ Dos'] (sin vacíos ni repetidos)
export function parsearLineup(texto = '') {
  const vistos = new Set();
  return texto
    .split(/[\n,]+/)
    .map((nombre) => nombre.trim())
    .filter((nombre) => {
      const clave = nombre.toLowerCase();
      if (!nombre || vistos.has(clave)) return false;
      vistos.add(clave);
      return true;
    });
}

// imagenOriginal: al editar, los eventos del proyecto tienen una imagen interna (no un link http),
// así que si no se cambió no se le exige ser un link
export function validarEvento(valores, { imagenOriginal } = {}) {
  const errores = {};
  const esProgramado = valores.estado === 'Programado';

  // Local: obligatorio, mínimo 3 caracteres
  if (!valores.local.trim()) {
    errores.local = 'El local es obligatorio.';
  } else if (valores.local.trim().length < 3) {
    errores.local = 'El local debe tener al menos 3 caracteres.';
  }

  // Imagen: obligatoria y debe ser un link http(s) (salvo que sea la imagen original sin cambios)
  if (!valores.imagen.trim()) {
    errores.imagen = 'El link de la imagen es obligatorio.';
  } else if (valores.imagen.trim() !== imagenOriginal && !esUrl(valores.imagen)) {
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

  // Horario: opcional, pero si se llena uno hay que llenar el otro (el término puede ser
  // después de medianoche, por eso no se compara con el inicio)
  const horaInicio = valores.horaInicio.trim();
  const horaTermino = valores.horaTermino.trim();
  if (horaInicio && !esHora(horaInicio)) {
    errores.horaInicio = 'Usa el formato HH:MM, ej: 22:00.';
  } else if (!horaInicio && horaTermino) {
    errores.horaInicio = 'Indica también la hora de inicio.';
  }
  if (horaTermino && !esHora(horaTermino)) {
    errores.horaTermino = 'Usa el formato HH:MM, ej: 04:00.';
  } else if (horaInicio && !horaTermino) {
    errores.horaTermino = 'Indica también la hora de término.';
  }

  // Género: opcional, máximo 50 caracteres
  if (valores.genero.trim().length > MAX_GENERO) {
    errores.genero = `Máximo ${MAX_GENERO} caracteres.`;
  }

  // Line-up: opcional, máximo 30 artistas
  if (parsearLineup(valores.lineup).length > MAX_ARTISTAS) {
    errores.lineup = `Máximo ${MAX_ARTISTAS} artistas.`;
  }

  return errores;
}
