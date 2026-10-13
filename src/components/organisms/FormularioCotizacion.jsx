import { useState } from 'react';
import { Caluga } from '../atoms/Caluga';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { CampoFormulario } from '../molecules/CampoFormulario';
import { valoresIniciales, validarCotizacion } from '../../logic/validarCotizacion';
import { guardarCotizacion } from '../../logic/cotizaciones';
import '../../styles/components/organisms/FormularioCotizacion.css';

export function FormularioCotizacion() {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  const recibirDatos = (e) => {
    e.preventDefault();

    const nuevosErrores = validarCotizacion(valores);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    guardarCotizacion(valores);
    alert('Recibimos tu solicitud, te contactaremos en breve.');
    setValores(valoresIniciales);
    setErrores({});
  };

  const hoy = new Date().toISOString().split('T')[0];

  return (
    <Caluga Component="section" id="cotizacion" className="seccion-cotizacion" data-bs-theme="dark">
      <Caluga className="cotizacion-contenido">
        <Text variant="h2" className="cotizacion-titulo">¿Quieres cotizar?</Text>
        <Text variant="p" className="cotizacion-subtitulo">
          Déjanos tus datos y te contactamos de inmediato.
        </Text>

        <Caluga Component="form" className="cotizacion-form" onSubmit={recibirDatos} noValidate>
          <CampoFormulario id="cotizacion-nombre" name="nombre" etiqueta="Nombre" type="text"
            placeholder="Ingresa tu nombre" value={valores.nombre} onChange={manejarCambio} error={errores.nombre} />
          <CampoFormulario id="cotizacion-telefono" name="telefono" etiqueta="Telefono" type="tel"
            placeholder="+56912345678" value={valores.telefono} onChange={manejarCambio} error={errores.telefono} />
          <CampoFormulario id="cotizacion-fecha" name="fecha" etiqueta="Fecha del evento" type="date"
            min={hoy} value={valores.fecha} onChange={manejarCambio} error={errores.fecha} />
          <CampoFormulario id="cotizacion-detalles" name="detalles" etiqueta="¿Qué necesitas para tu evento?"
            type="textarea" rows={3} placeholder="Cantidad de personas, tipo de evento..."
            value={valores.detalles} onChange={manejarCambio} error={errores.detalles} />
          <Button type="submit" className="cotizacion-boton w-100">Enviar solicitud</Button>
        </Caluga>
      </Caluga>
    </Caluga>
  );
}