import { Caluga } from '../atoms/Caluga';
import { TarjetaEvento } from '../molecules/TarjetaEvento';
import '../../styles/components/organisms/GaleriaEventos.css';
import Text from '../atoms/Text';

export function GaleriaEventos({ titulo, eventos = [] }) {
  return (
      <Caluga Component="section" id="fotos" className="galeria-eventos">
        <Text variant="h2" className="galeria-eventos-titulo">{titulo}</Text>
        <Caluga className="galeria-eventos-grid">
          {eventos.map((evento) => (
            <TarjetaEvento key={evento.id} {...evento} />
          ))}
        </Caluga>
      </Caluga>
    
  );
}