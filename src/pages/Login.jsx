import { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Caluga } from '../components/atoms/Caluga';
import Text from '../components/atoms/Text';
import { FormularioLogin } from '../components/organisms/FormularioLogin';
import { FormularioRegistro } from '../components/organisms/FormularioRegistro';
import '../styles/components/organisms/SeccionAcceso.css';

function Login() {
  // Pestaña activa: después de registrarse pasamos a "Iniciar sesión"
  const [pestana, setPestana] = useState('login');

  return (
    <Caluga Component="section" id="login" className="seccion-acceso" data-bs-theme="dark">
      <Caluga className="acceso-contenido">
        <Text variant="h2" className="acceso-titulo">Mi cuenta</Text>

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
      </Caluga>
    </Caluga>
  );
}

export default Login;
