import React from 'react';

export function HomeTemplate({ header, footer, children }) {
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}