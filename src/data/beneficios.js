// src/data/beneficios.js
import satellite from '../assets/images/satellite.webp';
import musicPack from '../assets/images/music-pack-folder.webp';
import audition from '../assets/images/audition.webp';
import dj from '../assets/images/dj.webp';
import adaptation from '../assets/images/adaptation.webp';
import dancing from '../assets/images/dancing.webp';

export const beneficios = [
  { id: 1, icono: satellite, alt: 'Satelite icono', titulo: 'Sonido que viaja por el espacio',
    descripcion: 'Cuidamos cada detalle técnico para que la música llegue nítida y potente, sin importar el tamaño del evento. Equipos profesionales, siempre listos para despegar.' },
  { id: 2, icono: musicPack, alt: 'Seleccion musica icono', titulo: 'Selección musical a tu medida',
    descripcion: 'No repetimos fórmulas. Armamos cada set pensando en tu evento, tu público y la energía que quieres transmitir.' },
  { id: 3, icono: audition, alt: 'Compromiso icono', titulo: 'Compromiso y puntualidad',
    descripcion: 'Llegamos antes, probamos el equipo, y estamos listos cuando tú lo necesitas. Sin sorpresas ni imprevistos de última hora.' },
  { id: 4, icono: dj, alt: 'Dj icono', titulo: 'Pasión real por lo que hacemos',
    descripcion: 'Somos un grupo emergente chileno que ama la música electrónica. Cada evento es una oportunidad de conectar con la gente, no solo un trabajo más.' },
  { id: 5, icono: adaptation, alt: 'Adaptabilidad icono', titulo: 'Adaptabilidad total',
    descripcion: 'Cumpleaños, matrimonios, fiestas universitarias, eventos corporativos — nos adaptamos al formato, al espacio y a la vibra que necesites.' },
  { id: 6, icono: dancing, alt: 'Fiesta calidad icono', titulo: 'Fiesta de calidad garantizado',
    descripcion: 'Garantizamos una fiesta de música electrónica de alta calidad para todo el público. Es de nuestro mayor interés entregar un buen servicio en cada una de nuestras fiestas.' },
];