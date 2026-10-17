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

export function FormularioEvento({ onAgregar }) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});

  const esProgramado = valores.estado === 'Programado';

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
    // Al cambiar el estado, fecha y link cambian de reglas: limpiamos errores
    if (name === 'estado') {
      setErrores({});
    } else if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const agregarEvento = (e) => {
    e.preventDefault();

    const nuevosErrores = validarEvento(valores);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const local = valores.local.trim();
    const lineup = parsearLineup(valores.lineup);
    const genero = valores.genero.trim();
    onAgregar({
      id: Date.now(),
      imagen: valores.imagen.trim(),
      alt: `Evento en ${local}`,
      local,
      estado: valores.estado,
      // Fecha y link solo existen en eventos Programados
      ...(esProgramado && { fecha: valores.fecha, link: valores.link.trim() }),
      // Horario, género y line-up son opcionales: solo se guardan si se llenaron
      ...(valores.horaInicio && { horaInicio: valores.horaInicio, horaTermino: valores.horaTermino }),
      ...(genero && { genero }),
      ...(lineup.length > 0 && { lineup }),
    });

    setValores(valoresIniciales);
    setErrores({});
  };

  return (
    <Caluga Component="section" id="agregar-evento" className="seccion-evento-form" data-bs-theme="dark">
      <Caluga className="evento-form-contenido">
        <Text variant="h2" className="evento-form-titulo">Agregar evento</Text>

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
              min={hoyISO()} value={valores.fecha} onChange={manejarCambio} error={errores.fecha}
              disabled={!esProgramado} />
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
          <Button type="submit" className="evento-form-boton w-100">Agregar evento</Button>
        </Caluga>
      </Caluga>
    </Caluga>
  );
}
