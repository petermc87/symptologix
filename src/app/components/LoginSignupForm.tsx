import { Button, Form } from "react-bootstrap";
import { FormTypes } from "../page";

type FormPropsType = {
  state: FormTypes;
};

export default function LoginSingupForm({ state }: FormPropsType) {
  return (
    <>
      <Form>
        <Form.Group className="mb-2">
          {/* Name and username only show up as an option at signup. */}
          {state ? (
            <>
              <Form.Control name="name" placeholder="Name" className="mb-2" />
              <Form.Control
                name="username"
                placeholder="Username"
                className="mb-2"
              />
            </>
          ) : (
            ""
          )}

          <Form.Control name="email" placeholder="Email" className="mb-2" />
          <Form.Control
            name="password"
            placeholder="Password"
            className="mb-2"
          />
        </Form.Group>
        {state ? (
          <Button className="mb-1">SIGNUP</Button>
        ) : (
          <Button className="mb-1">LOGIN</Button>
        )}
      </Form>
    </>
  );
}
