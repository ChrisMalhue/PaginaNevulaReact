import React from 'react';
import { Caluga } from '../atoms/Caluga';
import Text from '../atoms/Text';
import { TarjetaEvento } from '../molecules/TarjetaEvento';
import { esProximo } from '../../logic/fechasEventos';
import '../../styles/components/organisms/MisRecordatorios.css';

export function MisRecordatorios({ eventos = [], recordatorios = [], onToggleRecordatorio }) {
  // Solo eventos con la campanita activa que aún no suceden; los más cercanos primero
  // (los que no tienen fecha quedan al final)
  const proximos = eventos
    .filter((evento) => recordatorios.includes(evento.id) && esProximo(evento))
    .sort((a, b) => (a.fecha || '9999-12-31').localeCompare(b.fecha || '9999-12-31'));

  return (
    <Caluga id="recordatorios" className="mis-recordatorios">
      <Text variant="h3" className="mis-recordatorios-titulo">Mis recordatorios</Text>

      {proximos.length > 0 ? (
        <Caluga className="galeria-eventos-grid">
          {proximos.map((evento) => (
            <TarjetaEvento
              key={evento.id}
              {...evento}
              recordatorioActivo
              onToggleRecordatorio={onToggleRecordatorio}
            />
          ))}
        </Caluga>
      ) : (
        <Text variant="p" className="mis-recordatorios-vacio">
          Aún no tienes recordatorios. Toca la campanita de un evento próximo para agregarlo aquí.
        </Text>
      )}
    </Caluga>
  );
}
