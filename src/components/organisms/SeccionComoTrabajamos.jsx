import { Caluga } from '../atoms/Caluga';
import Text from '../atoms/Text';
import { List } from '../atoms/List';
import { ListItem } from '../atoms/ListItem';
import '../../styles/components/organisms/SeccionComoTrabajamos.css';

export function SeccionComoTrabajamos({ parrafo, introPasos, pasos = [] }) {
  return (
    <Caluga Component="section" id="trabajamos" className="como-trabajamos">
      <Caluga className="como-trabajamos-caja">
        <Text variant="p" className="como-trabajamos-parrafo">{parrafo}</Text>
        <Text variant="p" className="como-trabajamos-intro">{introPasos}</Text>
        {/* Component="ol" hace que sea una lista numerada */}
        <List Component="ol" className="como-trabajamos-pasos">
          {pasos.map((paso) => (
            <ListItem key={paso.id} className="como-trabajamos-paso">
              <Text variant="strong">{paso.titulo}</Text> — {paso.descripcion}
            </ListItem>
          ))}
        </List>
      </Caluga>
    </Caluga>
  );
}
