import { Caluga } from '../atoms/Caluga';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { CampoFormulario } from '../molecules/CampoFormulario';
import '../../styles/components/organisms/FormularioCotizacion.css';

export function FormularioCotizacion() {
  const recibirDatos = (evento) => {
    evento.preventDefault();   // Evita que la pagina se recargue
    alert('Recibimos tu solicitud, te contactaremos en breve.');
    evento.target.reset();     // Deja los campos vacios
  };

  return (
    <Caluga Component="section" id="cotizacion" className="seccion-cotizacion" data-bs-theme="dark">
      <Caluga className="cotizacion-contenido">
        <Text variant="h2" className="cotizacion-titulo">¿Quieres cotizar?</Text>
        <Text variant="p" className="cotizacion-subtitulo">
          Déjanos tus datos y te contactamos de inmediato.
        </Text>

        <Caluga Component="form" className="cotizacion-form" onSubmit={recibirDatos}>
          <CampoFormulario
            id="cotizacion-nombre"
            etiqueta="Nombre"
            type="text"
            placeholder="Ingresa tu nombre"
            required
          />
          <CampoFormulario
            id="cotizacion-telefono"
            etiqueta="Telefono"
            type="tel"
            placeholder="Numero de telefono"
            required
          />
          <CampoFormulario
            id="cotizacion-fecha"
            etiqueta="Fecha del evento"
            type="date"
            required
          />
          <CampoFormulario
            id="cotizacion-detalles"
            etiqueta="¿Qué necesitas para tu evento?"
            type="textarea"
            rows={3}
            placeholder="Cantidad de personas, tipo de evento..."
          />
          <Button type="submit" className="cotizacion-boton w-100">
            Enviar solicitud
          </Button>
        </Caluga>
      </Caluga>
    </Caluga>
  );
}
