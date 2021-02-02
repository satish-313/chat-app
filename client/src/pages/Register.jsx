import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export default function Register() {
  const [variables, setVariables] = useState({
    email: "",
    user: "",
    password: "",
    confirmPassword: "",
  });

  const submitRegisterForm = (e) => {
    e.preventDefault();
    console.log(variables);
  };
  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Register</h1>
        <Form onSubmit={submitRegisterForm}>
          <Form.Group>
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              value={variables.email}
              onChange={(e) =>
                setVariables({ ...variables, email: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              value={variables.user}
              onChange={(e) =>
                setVariables({ ...variables, user: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              value={variables.password}
              onChange={(e) =>
                setVariables({ ...variables, password: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>confirm password</Form.Label>
            <Form.Control
              type="password"
              value={variables.confirmPassword}
              onChange={(e) =>
                setVariables({
                  ...variables,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="success" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
