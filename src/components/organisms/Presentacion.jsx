import React from 'react';
import { Caluga } from '../atoms/Caluga';
import Video from '../atoms/Video';
import { Texts } from '../molecules/Texts';
import '../../styles/components/organisms/Presentacion.css';

export function Presentacion({ video, textos = [] }) {
  return (
    <Caluga Component="section" id="quienes" className="presentacion">
      <Caluga className="presentacion-video-box">
        <Video src={video} className="presentacion-video" />
      </Caluga>
      <Caluga className="presentacion-content">
        <Texts items={textos} />
      </Caluga>
    </Caluga>
  );
}