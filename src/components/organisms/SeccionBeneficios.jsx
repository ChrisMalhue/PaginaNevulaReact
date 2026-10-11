// src/components/organisms/SeccionBeneficios.jsx
import React from 'react';
import { Caluga } from '../atoms/Caluga';
import Text from '../atoms/Text';
import { TarjetaBeneficio } from '../molecules/TarjetaBeneficio';
import '../../styles/components/organisms/SeccionBeneficios.css';

export function SeccionBeneficios({ titulo, items = [] }) {
  return (
    <Caluga Component="section" id="elegirnos" className="beneficios">
      <Text variant="h2" className="beneficios-titulo">{titulo}</Text>
      <Caluga className="beneficios-grid">
        {items.map((item) => (
          <TarjetaBeneficio key={item.id} {...item} />
        ))}
      </Caluga>
    </Caluga>
  );
}