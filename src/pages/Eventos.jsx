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
import '../styles/pages/Eventos.css';

const { titulo, parrafo, introPasos, pasos } = comoTrabajamos;

function Eventos() {
  const logueado = estaLogueado();
  const usuario = obtenerUsuarioActivo();

  const [listaEventos, setListaEventos] = useState(eventos);
  // evento que el admin está editando en el formulario (null = el formulario agrega uno nuevo)
  const [eventoEditando, setEventoEditando] = useState(null);
  // los recordatorios son por usuario: solo se cargan los de quien tiene la sesión iniciada
  const [recordatorios, setRecordatorios] = useState(() =>
    logueado ? obtenerRecordatorios(usuario) : []
  );

  // el evento nuevo queda primero
  const agregarEvento = (nuevo) => setListaEventos((prev) => [nuevo, ...prev]);

  // solo el admin puede borrar eventos
  const admin = esAdmin();
  const eliminarEvento = (id) => {
    setListaEventos((prev) => prev.filter((evento) => evento.id !== id));
    // Si justo se estaba editando el evento que se borró, se cierra la edición
    if (eventoEditando?.id === id) setEventoEditando(null);
  };

  // editar: el formulario de abajo se carga con el evento elegido (solo admin)
  const iniciarEdicion = (id) => {
    setEventoEditando(listaEventos.find((evento) => evento.id === id) || null);
    document.getElementById('agregar-evento')?.scrollIntoView({ behavior: 'smooth' });
  };
  const guardarEdicion = (editado) => {
    setListaEventos((prev) => prev.map((evento) => (evento.id === editado.id ? editado : evento)));
    setEventoEditando(null);
  };

  const alternarRecordatorio = (id) => {
    const nuevos = recordatorios.includes(id)
      ? recordatorios.filter((r) => r !== id)
      : [...recordatorios, id];
    setRecordatorios(nuevos);
    guardarRecordatorios(usuario, nuevos);
  };

  // sin sesión no se pasa el toggle: no hay campanita ni "Mis recordatorios"
  const toggle = logueado ? alternarRecordatorio : undefined;

  // solo eventos con la campanita activa que aún no suceden; los más cercanos primero (los que no tienen fecha quedan al final)
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
              onEditar={admin ? iniciarEdicion : undefined}
              onEliminar={admin ? eliminarEvento : undefined}
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
      {admin && (
        <FormularioEvento
          key={eventoEditando ? eventoEditando.id : 'nuevo'}
          onAgregar={agregarEvento}
          eventoEditando={eventoEditando}
          onGuardar={guardarEdicion}
          onCancelar={() => setEventoEditando(null)}
        />
      )}
    </>
  );
}

export default Eventos;
