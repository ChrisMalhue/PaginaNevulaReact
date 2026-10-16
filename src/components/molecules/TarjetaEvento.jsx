import React from 'react';
import { Caluga } from '../atoms/Caluga';
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
  recordatorioActivo = false,
  onToggleRecordatorio,
}) {
  // El botón de compra solo aparece si el evento está Programado y tiene link
  const mostrarBoton = estado === 'Programado' && link;
  // La campanita solo aparece en eventos que aún no suceden
  const mostrarCampana = onToggleRecordatorio && esProximo({ estado, fecha });
  const textoCampana = recordatorioActivo ? 'Quitar recordatorio' : 'Recordarme este evento';

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
      {mostrarBoton && (
        <Button href={link} target="_blank" rel="noopener noreferrer" className="evento-boton">
          Comprar ticket
        </Button>
      )}
    </Caluga>
  );
}
