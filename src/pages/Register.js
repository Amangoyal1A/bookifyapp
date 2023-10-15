import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import { useState } from "react";

function Register() {
  const firebase = useFirebase();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //   console.log(email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("singing...");
    const result = await firebase.signupUserWithEmailPassword(email, password);
    console.log("signup success", result);
  };
  return (
    <div className="container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h1>Sign up</h1>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Create Account
        </Button>
      </Form>
    </div>
  );
}

export default Register;
