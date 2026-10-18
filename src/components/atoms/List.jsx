export function List({ children, className, Component = 'ul' }) {
  return (
    <Component className={className}>
      {children}
    </Component>
  );
}