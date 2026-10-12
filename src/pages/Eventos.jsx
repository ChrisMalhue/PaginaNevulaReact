import { SeccionComoTrabajamos } from '../components/organisms/SeccionComoTrabajamos';
import { GaleriaEventos } from '../components/organisms/GaleriaEventos';
import { comoTrabajamos } from '../data/comoTrabajamos';
import { eventos } from '../data/eventos';

function Eventos() {
  return (
    <>
      <SeccionComoTrabajamos {...comoTrabajamos} />
      <GaleriaEventos eventos={eventos} />
    </>
  );
}

export default Eventos;