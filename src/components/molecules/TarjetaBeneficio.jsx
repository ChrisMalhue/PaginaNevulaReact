import { Caluga } from '../atoms/Caluga';
import { Icono } from '../atoms/Icono';
import { Texts } from './Texts';

export function TarjetaBeneficio({ icono, titulo, descripcion }) {
  return (
    <Caluga className="tarjeta">
      <Icono Component={icono} className="tarjeta-icono" />
      <Texts items={[
        { text: titulo, variant: 'p', className: 'tarjeta-titulo' },
        { text: descripcion, variant: 'p', className: 'tarjeta-texto' },
      ]} />
    </Caluga>
  );
}