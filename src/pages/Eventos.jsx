import { useState } from 'react';
import { Caluga } from '../components/atoms/Caluga';
import Text from '../components/atoms/Text';
import { List } from '../components/atoms/List';
import { ListItem } from '../components/atoms/ListItem';
import { TarjetaEvento } from '../components/molecules/TarjetaEvento';
import { FormularioEvento } from '../components/organisms/FormularioEvento';
import { comoTrabajamos } from '../data/comoTrabajamos';
import { eventos } from '../data/eventos';
import { estaLogueado, obtenerUsuarioActivo, esAdmin } from '../logic/sesion';
import { esProximo } from '../logic/fechasEventos';
import { obtenerRecordatorios, guardarRecordatorios } from '../logic/recordatorios';
import '../styles/components/organisms/SeccionComoTrabajamos.css';
import '../styles/components/organisms/GaleriaEventos.css';
import '../styles/components/organisms/MisRecordatorios.css';

const { titulo, parrafo, introPasos, pasos } = comoTrabajamos;

function Eventos() {
  const logueado = estaLogueado();
  const usuario = obtenerUsuarioActivo();

  const [listaEventos, setListaEventos] = useState(eventos);
  // Los recordatorios son por usuario: solo se cargan los de quien tiene la sesión iniciada
  const [recordatorios, setRecordatorios] = useState(() =>
    logueado ? obtenerRecordatorios(usuario) : []
  );

  // El evento nuevo queda primero, igual que en la maqueta
  const agregarEvento = (nuevo) => setListaEventos((prev) => [nuevo, ...prev]);

  const alternarRecordatorio = (id) => {
    const nuevos = recordatorios.includes(id)
      ? recordatorios.filter((r) => r !== id)
      : [...recordatorios, id];
    setRecordatorios(nuevos);
    guardarRecordatorios(usuario, nuevos);
  };

  // Sin sesión no se pasa el toggle: no hay campanita ni "Mis recordatorios"
  const toggle = logueado ? alternarRecordatorio : undefined;

  // Solo eventos con la campanita activa que aún no suceden; los más cercanos primero
  // (los que no tienen fecha quedan al final)
  const proximos = listaEventos
    .filter((evento) => recordatorios.includes(evento.id) && esProximo(evento))
    .sort((a, b) => (a.fecha || '9999-12-31').localeCompare(b.fecha || '9999-12-31'));

  return (
    <>
      {/* Cómo trabajamos */}
      <Caluga Component="section" id="trabajamos" className="como-trabajamos">
        <Caluga className="como-trabajamos-caja">
          <Text variant="h2" className="como-trabajamos-titulo">{titulo}</Text>
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

      {/* Galería de eventos */}
      <Caluga Component="section" id="fotos" className="galeria-eventos">
        <Text variant="h2" className="galeria-eventos-titulo">Galería de eventos</Text>
        <Caluga className="galeria-eventos-grid">
          {listaEventos.map((evento) => (
            <TarjetaEvento
              key={evento.id}
              {...evento}
              recordatorioActivo={recordatorios.includes(evento.id)}
              onToggleRecordatorio={toggle}
            />
          ))}
        </Caluga>

        {/* Mis recordatorios: solo con sesión iniciada */}
        {toggle && (
          <Caluga id="recordatorios" className="mis-recordatorios">
            <Text variant="h3" className="mis-recordatorios-titulo">Mis recordatorios</Text>

            {proximos.length > 0 ? (
              <Caluga className="galeria-eventos-grid">
                {proximos.map((evento) => (
                  <TarjetaEvento
                    key={evento.id}
                    {...evento}
                    recordatorioActivo
                    onToggleRecordatorio={toggle}
                  />
                ))}
              </Caluga>
            ) : (
              <Text variant="p" className="mis-recordatorios-vacio">
                Aún no tienes recordatorios. Toca la campanita de un evento próximo para agregarlo aquí.
              </Text>
            )}
          </Caluga>
        )}
      </Caluga>

      {/* El formulario es solo para la cuenta admin */}
      {esAdmin() && <FormularioEvento onAgregar={agregarEvento} />}
    </>
  );
}

export default Eventos;
