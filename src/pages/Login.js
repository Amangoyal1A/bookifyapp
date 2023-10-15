import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const firebase = useFirebase();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  console.log(firebase);
  //   console.log(email);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase.isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login...");
      const result = await firebase.LoginUser(email, password);
      if (result) {
        console.log("Login Successfull", result);
      } else {
        console.log("Invalid user and password");
      }
    } catch (error) {
      console.error("error->", error.message);
    }
  };

  const handleGoogleLogin = () => {
    firebase.SignWithGoogle();
  };
  return (
    <div className="container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h1>Login User</h1>
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
          Login
        </Button>
        <br></br>
        <Button
          variant="danger"
          //   type="submit"
          onClick={handleGoogleLogin}
          className="mt-2 mb-5"
        >
          Signin with Google
        </Button>
      </Form>
    </div>
  );
}

export default Login;
