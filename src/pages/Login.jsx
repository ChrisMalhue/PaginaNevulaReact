import { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { PaginaTemplate } from '../components/templates/PaginaTemplate';
import { FormularioLogin } from '../components/organisms/FormularioLogin';
import { FormularioRegistro } from '../components/organisms/FormularioRegistro';
import '../styles/pages/Login.css';

function Login() {
  const [pestana, setPestana] = useState('login');

  return (
    <PaginaTemplate
      id="login"
      titulo="Mi cuenta"
      claseSeccion="seccion-acceso"
      claseContenido="acceso-contenido"
      claseTitulo="acceso-titulo"
    >
      <Tabs
        activeKey={pestana}
        onSelect={(clave) => setPestana(clave)}
        variant="pills"
        justify
        className="acceso-tabs"
      >
        <Tab eventKey="login" title="Iniciar sesión">
          <FormularioLogin />
        </Tab>
        <Tab eventKey="registro" title="Registrarse">
          <FormularioRegistro onRegistrado={() => setPestana('login')} />
        </Tab>
      </Tabs>
    </PaginaTemplate>
  );
}

export default Login;
