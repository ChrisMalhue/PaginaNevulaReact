import React, { useState } from 'react';
import { Caluga } from '../atoms/Caluga';
import Button from '../atoms/Button';
import { CampoFormulario } from '../molecules/CampoFormulario';
import { valoresIniciales, validarRegistro } from '../../logic/validarRegistro';
import { obtenerUsuarios, registrarUsuario } from '../../logic/usuariosRegistrados';
import '../../styles/components/organisms/FormularioAcceso.css';

export function FormularioRegistro({ onRegistrado }) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
    // Al editar la contraseña también se limpia el error de "no coinciden"
    setErrores((prev) => ({
      ...prev,
      [name]: undefined,
      ...(name === 'contrasena' && { repetir: undefined }),
    }));
  };

  const registrar = (e) => {
    e.preventDefault();

    const nuevosErrores = validarRegistro(valores, obtenerUsuarios());
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    registrarUsuario(valores);
    alert('Registrado exitosamente!');
    setValores(valoresIniciales);
    setErrores({});
    if (onRegistrado) onRegistrado();
  };

  return (
    <Caluga Component="form" className="formulario-acceso" onSubmit={registrar} noValidate>
      <CampoFormulario id="registro-usuario" name="usuario" etiqueta="Nombre de usuario" type="text"
        placeholder="Elige tu nombre de usuario" autoComplete="username"
        value={valores.usuario} onChange={manejarCambio} error={errores.usuario} />
      <CampoFormulario id="registro-correo" name="correo" etiqueta="Correo" type="email"
        placeholder="nombre@correo.com" autoComplete="email"
        value={valores.correo} onChange={manejarCambio} error={errores.correo} />
      <CampoFormulario id="registro-contrasena" name="contrasena" etiqueta="Contraseña" type="password"
        placeholder="Mínimo 8 caracteres, con letra y número" autoComplete="new-password"
        value={valores.contrasena} onChange={manejarCambio} error={errores.contrasena} />
      <CampoFormulario id="registro-repetir" name="repetir" etiqueta="Repetir contraseña" type="password"
        placeholder="Repite tu contraseña" autoComplete="new-password"
        value={valores.repetir} onChange={manejarCambio} error={errores.repetir} />
      <Button type="submit" className="acceso-boton w-100">Registrarse</Button>
    </Caluga>
  );
}
