import React from 'react';
import { Caluga } from '../atoms/Caluga';
import Button from '../atoms/Button';
import { CampoFormulario } from '../molecules/CampoFormulario';
import { iniciarSesion } from '../../logic/sesion';
import '../../styles/components/organisms/FormularioAcceso.css';

export function FormularioLogin() {
  const recibirDatosLogin = (e) => {
    e.preventDefault();

    // Sin useState: leemos los valores directo del formulario
    const datos = new FormData(e.target);
    const usuario = datos.get('usuario').trim();
    const contrasena = datos.get('contrasena');

    if (iniciarSesion(usuario, contrasena)) {
      window.location.href = '/';
    } else {
      alert('Usuario o contraseña incorrecto');
    }
  };

  return (
    <Caluga Component="form" className="formulario-acceso" onSubmit={recibirDatosLogin}>
      <CampoFormulario
        id="login-usuario"
        name="usuario"
        etiqueta="Nombre de usuario"
        type="text"
        placeholder="Ingresa tu nombre de usuario"
        autoComplete="username"
        required
      />
      <CampoFormulario
        id="login-contrasena"
        name="contrasena"
        etiqueta="Contraseña"
        type="password"
        placeholder="Contraseña"
        autoComplete="current-password"
        required
      />
      <Button type="submit" className="acceso-boton w-100">Iniciar sesión</Button>
    </Caluga>
  );
}
