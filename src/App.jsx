import { Routes, Route } from 'react-router-dom';
import { FaHouse, FaPhone, FaEnvelope } from 'react-icons/fa6';
import NavBar from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';
import Home from './pages/Home';
import Eventos from './pages/Eventos';
import FaqCotizacion from './pages/FaqCotizacion';
import logo from './assets/images/logo.webp';
import instagram from './assets/images/instagram.webp';
import youtube from './assets/images/youtube.webp';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/faqcotiza" element={<FaqCotizacion />} />
      </Routes>
      <Footer
        logo={logo}
        enlaces={[
          { label: 'Como trabajamos', href: '/eventos#trabajamos' },
          { label: 'Preguntas Frecuentes', href: '/faqcotiza#faq' },
        ]}
        contactos={[
          { icono: <FaHouse />, texto: 'Av. Alguna Parte' },
          { icono: <FaPhone />, texto: '+56911111111' },
          { icono: <FaEnvelope />, texto: 'correo@gmail.com' },
        ]}
        redes={[
          { nombre: 'Instagram', icono: instagram, href: 'https://www.instagram.com/nevula.scl/' },
          { nombre: 'YouTube', icono: youtube, href: 'https://www.youtube.com/channel/UCa-jOKgfq2FLccvHXteRdpQ' },
        ]}
      />
    </>
  );
}

export default App;