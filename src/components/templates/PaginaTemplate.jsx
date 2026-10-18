import { Caluga } from '../atoms/Caluga';
import Text from '../atoms/Text';

export function PaginaTemplate({
  id,
  titulo,
  claseSeccion,
  claseContenido,
  claseTitulo,
  children,
}) {
  return (
    <Caluga Component="section" id={id} className={claseSeccion} data-bs-theme="dark">
      <Caluga className={claseContenido}>
        {titulo && <Text variant="h2" className={claseTitulo}>{titulo}</Text>}
        {children}
      </Caluga>
    </Caluga>
  );
}