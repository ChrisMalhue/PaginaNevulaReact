import React from 'react';

function Link({ href, className, children, ...props }) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}

export default Link;