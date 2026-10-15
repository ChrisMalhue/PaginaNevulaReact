import React from 'react';
import { FaBell, FaRegBell } from 'react-icons/fa6';
import Button from '../atoms/Button';

export function BotonRecordatorio({ activo = false, onClick }) {
  const texto = activo ? 'Quitar recordatorio' : 'Recordarme este evento';

  return (
    <Button
      type="button"
      className={`evento-recordatorio${activo ? ' activo' : ''}`}
      onClick={onClick}
      aria-pressed={activo}
      aria-label={texto}
      title={texto}
    >
      {activo ? <FaBell /> : <FaRegBell />}
    </Button>
  );
}
