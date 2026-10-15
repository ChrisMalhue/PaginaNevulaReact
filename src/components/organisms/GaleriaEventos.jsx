import React from 'react';
import { Caluga } from '../atoms/Caluga';
import { TarjetaEvento } from '../molecules/TarjetaEvento';
import { MisRecordatorios } from './MisRecordatorios';
import '../../styles/components/organisms/GaleriaEventos.css';
import Text from '../atoms/Text';

export function GaleriaEventos({ titulo, eventos = [], recordatorios = [], onToggleRecordatorio }) {
  return (
    <Caluga Component="section" id="fotos" className="galeria-eventos">
      <Text variant="h2" className="galeria-eventos-titulo">{titulo}</Text>
      <Caluga className="galeria-eventos-grid">
        {eventos.map((evento) => (
          <TarjetaEvento
            key={evento.id}
            {...evento}
            recordatorioActivo={recordatorios.includes(evento.id)}
            onToggleRecordatorio={onToggleRecordatorio}
          />
        ))}
      </Caluga>

      {/* Sin sesión no llega el toggle, así que este apartado no se muestra */}
      {onToggleRecordatorio && (
        <MisRecordatorios
          eventos={eventos}
          recordatorios={recordatorios}
          onToggleRecordatorio={onToggleRecordatorio}
        />
      )}
    </Caluga>
  );
}
