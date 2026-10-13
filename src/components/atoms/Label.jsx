import { Form } from 'react-bootstrap';

function Label({ className = '', children, ...props }) {
  return <Form.Label className={className} {...props}>{children}</Form.Label>;
}

export { Label };
