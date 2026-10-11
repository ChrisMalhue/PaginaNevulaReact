import React from 'react';

function Video({ src, type = 'video/webm', className }) {
  return (
    <video className={className} autoPlay loop muted playsInline>
      <source src={src} type={type} />
    </video>
  );
}

export default Video;