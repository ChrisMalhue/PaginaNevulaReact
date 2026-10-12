import { Caluga } from '../atoms/Caluga';
import { TarjetaEvento } from '../molecules/TarjetaEvento';
import '../../styles/components/organisms/GaleriaEventos.css';

export function GaleriaEventos({ eventos = [] }) {
  return (
    <Caluga Component="section" id="fotos" className="galeria-eventos">
      <Caluga className="galeria-eventos-grid">
        {eventos.map((evento) => (
          <TarjetaEvento key={evento.id} {...evento} />
        ))}
      </Caluga>
    </Caluga>
  );
}