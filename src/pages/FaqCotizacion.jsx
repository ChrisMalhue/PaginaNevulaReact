import { SeccionFaq } from '../components/organisms/SeccionFaq';
import { FormularioCotizacion } from '../components/organisms/FormularioCotizacion';
import { preguntasFrecuentes } from '../data/faq';

function FaqCotizacion() {
  return (
    <>
      <SeccionFaq preguntas={preguntasFrecuentes} />
      <FormularioCotizacion />
    </>
  );
}

export default FaqCotizacion;
