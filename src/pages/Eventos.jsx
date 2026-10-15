import React, { useState } from 'react';
import { SeccionComoTrabajamos } from '../components/organisms/SeccionComoTrabajamos';
import { GaleriaEventos } from '../components/organisms/GaleriaEventos';
import { FormularioEvento } from '../components/organisms/FormularioEvento';
import { comoTrabajamos } from '../data/comoTrabajamos';
import { eventos } from '../data/eventos';
import { estaLogueado, obtenerUsuarioActivo, esAdmin } from '../logic/sesion';
import { obtenerRecordatorios, guardarRecordatorios } from '../logic/recordatorios';

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

  return (
    <>
      <SeccionComoTrabajamos {...comoTrabajamos} />
      {/* Sin sesión no se pasa el toggle: no hay campanita ni "Mis recordatorios" */}
      <GaleriaEventos
        titulo="Galería de eventos"
        eventos={listaEventos}
        recordatorios={recordatorios}
        onToggleRecordatorio={logueado ? alternarRecordatorio : undefined}
      />
      {/* El formulario es solo para la cuenta admin */}
      {esAdmin() && <FormularioEvento onAgregar={agregarEvento} />}
    </>
  );
}

export default Eventos;
