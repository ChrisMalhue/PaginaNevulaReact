import React from 'react';
import { Caluga } from '../atoms/Caluga';
import Image from '../atoms/Image';
import { Texts } from './Texts';

export function TarjetaBeneficio({ icono, alt, titulo, descripcion }) {
  return (
    <Caluga className="tarjeta">
      <Image src={icono} alt={alt} className="tarjeta-icono" />
      <Texts items={[
        { text: titulo, variant: 'p', className: 'tarjeta-titulo' },
        { text: descripcion, variant: 'p', className: 'tarjeta-texto' },
      ]} />
    </Caluga>
  );
}