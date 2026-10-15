function Icono({ Component, className = '', ...props }) {
  return <Component className={className} aria-hidden="true" {...props} />;
}

export { Icono };