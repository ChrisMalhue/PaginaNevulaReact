import { Caluga } from '../atoms/Caluga';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import { Texts } from './Texts';

export function TarjetaEvento({ imagen, alt, local, estado, link }) {
  // El botón de compra solo aparece si el evento está Programado y tiene link
  const mostrarBoton = estado === 'Programado' && link;

  return (
    <Caluga className="evento-tarjeta">
      <Image src={imagen} alt={alt} className="evento-imagen" />
      <Texts items={[
        { text: `Local: ${local}`, variant: 'p', className: 'evento-dato' },
        { text: `Estado: ${estado}`, variant: 'p', className: 'evento-dato' },
      ]} />
      {mostrarBoton && (
        <Button href={link} target="_blank" rel="noopener noreferrer" className="evento-boton">
          Comprar ticket
        </Button>
      )}
    </Caluga>
  );
}