import React from 'react';
import { Presentacion } from '../components/organisms/Presentacion';
import { SeccionBeneficios } from '../components/organisms/SeccionBeneficios';
import { beneficios } from '../data/beneficios';
import videoAniversario from '../assets/videos/video_aniversario.webm';

function Home() {
  return (
    <>
      <Presentacion
        video={videoAniversario}
        textos={[
          { text: 'Nevula', variant: 'h1', className: 'presentacion-title' },
          { text: 'Desde las profundidades del cosmos, entre destellos galácticos y frecuencias que viajan por el vacío...', variant: 'p', className: 'presentacion-text' },
          { text: 'Somos un grupo de DJ emergente chileno', variant: 'p', className: 'presentacion-highlight' },
        ]}
      />
      <SeccionBeneficios titulo="Por qué elegir a Nevula" items={beneficios} />
    </>
  );
}

export default Home;