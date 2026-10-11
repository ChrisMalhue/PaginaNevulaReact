import React from 'react';

export function Caluga({ Component = 'div', className, children, ...props }) {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}