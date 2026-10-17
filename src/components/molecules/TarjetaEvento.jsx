import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Caluga } from '../atoms/Caluga';
import Text from '../atoms/Text';
import { List } from '../atoms/List';
import { ListItem } from '../atoms/ListItem';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import { FaBell, FaRegBell } from 'react-icons/fa6';
import { Texts } from './Texts';
import { esProximo, formatearFecha } from '../../logic/fechasEventos';

export function TarjetaEvento({
  id,
  imagen,
  alt,
  local,
  estado,
  fecha,
  link,
  horaInicio,
  horaTermino,
  lineup = [],
  genero,
  recordatorioActivo = false,
  onToggleRecordatorio,
  onEliminar,
}) {
  // Los detalles (horario, line-up y género) se despliegan dentro de la tarjeta
  const [detallesAbiertos, setDetallesAbiertos] = useState(false);
  // Si el evento no tiene horario, line-up ni género (ej: los que agrega el admin), no hay botón
  const tieneDetalles = Boolean(horaInicio || lineup.length > 0 || genero);
  const idDetalles = `evento-detalles-${id}`;

  // El botón de compra solo aparece si el evento está Programado y tiene link
  const mostrarBoton = estado === 'Programado' && link;
  // La campanita solo aparece en eventos que aún no suceden
  const mostrarCampana = onToggleRecordatorio && esProximo({ estado, fecha });
  const textoCampana = recordatorioActivo ? 'Quitar recordatorio' : 'Recordarme este evento';

  // Solo llega onEliminar cuando quien mira es admin; pedimos confirmación antes de borrar
  const eliminar = () => {
    if (window.confirm(`¿Seguro que quieres eliminar el evento en ${local}?`)) {
      onEliminar(id);
    }
  };

  const datos = [
    { text: `Local: ${local}`, variant: 'p', className: 'evento-dato' },
    { text: `Estado: ${estado}`, variant: 'p', className: 'evento-dato' },
  ];
  if (fecha) {
    datos.push({ text: `Fecha: ${formatearFecha(fecha)}`, variant: 'p', className: 'evento-dato' });
  }
  if (mostrarCampana && recordatorioActivo) {
    datos.push({ text: 'Recordatorio activado', variant: 'p', className: 'evento-recordatorio-texto' });
  }

  return (
    <Caluga className="evento-tarjeta">
      {mostrarCampana && (
        <Button
          type="button"
          className={`evento-recordatorio${recordatorioActivo ? ' activo' : ''}`}
          onClick={() => onToggleRecordatorio(id)}
          aria-pressed={recordatorioActivo}
          aria-label={textoCampana}
          title={textoCampana}
        >
          {recordatorioActivo ? <FaBell /> : <FaRegBell />}
        </Button>
      )}
      <Image src={imagen} alt={alt} className="evento-imagen" />
      <Texts items={datos} />
      {tieneDetalles && (
        <>
          <Button
            type="button"
            variant="outline-light"
            size="sm"
            className="evento-detalle-boton"
            onClick={() => setDetallesAbiertos((abierto) => !abierto)}
            aria-expanded={detallesAbiertos}
            aria-controls={idDetalles}
          >
            {detallesAbiertos ? 'Ocultar detalles' : 'Ver detalles'}
          </Button>
          <Collapse in={detallesAbiertos} unmountOnExit>
            <div id={idDetalles} className="evento-detalles">
              {horaInicio && horaTermino && (
                <Text variant="p" className="evento-detalle-horario">
                  Horario: {horaInicio} – {horaTermino}
                </Text>
              )}
              {lineup.length > 0 && (
                <>
                  <Text variant="p" className="evento-detalle-titulo">Line-up</Text>
                  <List className="evento-lineup">
                    {lineup.map((dj) => (
                      <ListItem key={dj}>{dj}</ListItem>
                    ))}
                  </List>
                </>
              )}
              {genero && (
                <Text variant="p" className="evento-detalle-horario">
                  Género de Música: {genero}
                </Text>
              )}
            </div>
          </Collapse>
        </>
      )}
      {mostrarBoton && (
        <Button href={link} target="_blank" rel="noopener noreferrer" className="evento-boton">
          Comprar ticket
        </Button>
      )}
      {onEliminar && (
        <Button
          type="button"
          variant="outline-danger"
          size="sm"
          className="evento-eliminar-boton"
          onClick={eliminar}
          aria-label={`Eliminar evento ${local}`}
        >
          Eliminar evento
        </Button>
      )}
    </Caluga>
  );
}
