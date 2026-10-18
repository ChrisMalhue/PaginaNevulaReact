import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Caluga } from '../atoms/Caluga';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { CampoFormulario } from '../molecules/CampoFormulario';
import { estadosEvento } from '../../data/estadosEvento';
import { valoresIniciales, validarEvento, parsearLineup } from '../../logic/validarEvento';
import { hoyISO } from '../../logic/fechasEventos';
import '../../styles/components/organisms/FormularioEvento.css';

// pasa un evento guardado a los valores de texto que usa el formulario
const valoresDesdeEvento = (evento) => ({
  local: evento.local,
  estado: evento.estado,
  fecha: evento.fecha || '',
  imagen: evento.imagen,
  link: evento.link || '',
  horaInicio: evento.horaInicio || '',
  horaTermino: evento.horaTermino || '',
  genero: evento.genero || '',
  lineup: (evento.lineup || []).join('\n'),
});

// sirve para agregar y para editar.
// al cambiar de evento a editar, el padre cambia la key del formulario y se reinicia solo.
export function FormularioEvento({ onAgregar, eventoEditando, onGuardar, onCancelar }) {
  const editando = Boolean(eventoEditando);
  const [valores, setValores] = useState(() =>
    editando ? valoresDesdeEvento(eventoEditando) : valoresIniciales
  );
  const [errores, setErrores] = useState({});

  const esProgramado = valores.estado === 'Programado';

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
    // al cambiar el estado, la fecha y el link cambian de reglas y limpiamos errores
    if (name === 'estado') {
      setErrores({});
    } else if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const agregarEvento = (e) => {
    e.preventDefault();

    const nuevosErrores = validarEvento(valores, { imagenOriginal: eventoEditando?.imagen });
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const local = valores.local.trim();
    const lineup = parsearLineup(valores.lineup);
    const genero = valores.genero.trim();
    const evento = {
      id: editando ? eventoEditando.id : Date.now(),
      imagen: valores.imagen.trim(),
      alt: `Evento en ${local}`,
      local,
      estado: valores.estado,
      // el link de entradas solo existe en los eventos programados
      ...(valores.fecha && { fecha: valores.fecha }),
      ...(esProgramado && { link: valores.link.trim() }),
      // horario, género y line-up son opcionales: solo se guardan si se llenaron
      ...(valores.horaInicio && { horaInicio: valores.horaInicio, horaTermino: valores.horaTermino }),
      ...(genero && { genero }),
      ...(lineup.length > 0 && { lineup }),
    };

    if (editando) {
      onGuardar(evento);
      return;
    }

    onAgregar(evento);
    setValores(valoresIniciales);
    setErrores({});
  };

  return (
    <Caluga Component="section" id="agregar-evento" className="seccion-evento-form" data-bs-theme="dark">
      <Caluga className="evento-form-contenido">
        <Text variant="h2" className="evento-form-titulo">{editando ? 'Editar evento' : 'Agregar evento'}</Text>

        <Caluga Component="form" className="formulario-evento" onSubmit={agregarEvento} noValidate>
          <Caluga className="evento-form-grid">
            <CampoFormulario id="evento-local" name="local" etiqueta="Local del evento" type="text"
              placeholder="Escribe aquí" value={valores.local} onChange={manejarCambio} error={errores.local} />
            <Form.Group className="mb-3" controlId="evento-estado">
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado" value={valores.estado} onChange={manejarCambio}>
                {estadosEvento.map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <CampoFormulario id="evento-fecha" name="fecha" etiqueta="Fecha del evento" type="date"
              min={esProgramado ? hoyISO() : undefined} value={valores.fecha} onChange={manejarCambio}
              error={errores.fecha} />
            <CampoFormulario id="evento-link" name="link" etiqueta="Link para comprar entradas" type="text"
              placeholder="Solo si está Programado" value={valores.link} onChange={manejarCambio}
              error={errores.link} disabled={!esProgramado} />
            <CampoFormulario id="evento-hora-inicio" name="horaInicio" etiqueta="Hora de inicio" type="time"
              value={valores.horaInicio} onChange={manejarCambio} error={errores.horaInicio} />
            <CampoFormulario id="evento-hora-termino" name="horaTermino" etiqueta="Hora de término" type="time"
              value={valores.horaTermino} onChange={manejarCambio} error={errores.horaTermino} />
            <Caluga className="evento-form-ancho">
              <CampoFormulario id="evento-genero" name="genero" etiqueta="Género de música" type="text"
                placeholder="Opcional. Ej: Techno, House" value={valores.genero} onChange={manejarCambio}
                error={errores.genero} />
            </Caluga>
            <Caluga className="evento-form-ancho">
              <CampoFormulario id="evento-lineup" name="lineup" etiqueta="Line-up" type="textarea" rows={4}
                placeholder="Opcional. Un artista por línea o separados por coma"
                value={valores.lineup} onChange={manejarCambio} error={errores.lineup} />
            </Caluga>
            <Caluga className="evento-form-ancho">
              <CampoFormulario id="evento-imagen" name="imagen" etiqueta="Imagen del evento" type="text"
                placeholder="Pega el link aquí" value={valores.imagen} onChange={manejarCambio}
                error={errores.imagen} />
            </Caluga>
          </Caluga>
          <Caluga className="evento-form-acciones">
            <Button type="submit" className="evento-form-boton">
              {editando ? 'Guardar cambios' : 'Agregar evento'}
            </Button>
            {editando && (
              <Button type="button" className="evento-form-cancelar" onClick={onCancelar}>
                Cancelar
              </Button>
            )}
          </Caluga>
        </Caluga>
      </Caluga>
    </Caluga>
  );
}