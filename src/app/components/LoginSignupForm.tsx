import { Button, Form } from "react-bootstrap";

export default function LoginSingupForm() {
  return (
    <>
      <Form>
        <Form.Group className="mb-2">
          <Form.Control name="name" placeholder="Name" className="mb-2" />
          <Form.Control
            name="username"
            placeholder="Username"
            className="mb-2"
          />
          <Form.Control name="email" placeholder="Email" className="mb-2" />
          <Form.Control
            name="password"
            placeholder="Password"
            className="mb-2"
          />
        </Form.Group>
        <Button className="mb-1">LOGIN</Button>
      </Form>
    </>
  );
}
