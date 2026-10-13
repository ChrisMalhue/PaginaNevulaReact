import { Caluga } from '../atoms/Caluga';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';

// "id" une el Label con el Input: al hacer clic en el texto, se enfoca el campo
export function CampoFormulario({ id, etiqueta, ...propsInput }) {
  return (
    <Caluga className="campo-formulario">
      <Label htmlFor={id}>{etiqueta}</Label>
      <Input id={id} {...propsInput} />
    </Caluga>
  );
}
