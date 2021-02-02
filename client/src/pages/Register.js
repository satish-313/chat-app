import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import {Link} from 'react-router-dom'

const REGISTER_USER = gql`
  mutation register(
    $user: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      user: $user
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      user
      email
      createdAt
    }
  }
`;

export default function Register(props) {
  const [variables, setVariables] = useState({
    email: "",
    user: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, __) {
      props.history.push('/login')
    },
    onError(err) {
      // console.log(err.graphQLErrors[0].extensions);
      setErrors(err.graphQLErrors[0].extensions);
    },
  });

  const submitRegisterForm = (e) => {
    e.preventDefault();
    registerUser({ variables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Register</h1>
        <Form onSubmit={submitRegisterForm}>
          <Form.Group>
            <Form.Label className={errors.email && "text-danger"}>
              {errors.email ?? "email"}
            </Form.Label>
            <Form.Control
              type="email"
              value={variables.email}
              onChange={(e) =>
                setVariables({ ...variables, email: e.target.value })
              }
              className={errors.email && "is-invalid"}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.user && "text-danger"}>
              {errors.user ?? "username"}
            </Form.Label>
            <Form.Control
              type="text"
              value={variables.user}
              onChange={(e) =>
                setVariables({ ...variables, user: e.target.value })
              }
              className={errors.user && "is-invalid"}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.password && "text-danger"}>
              {errors.password ?? "password"}
            </Form.Label>
            <Form.Control
              type="password"
              value={variables.password}
              onChange={(e) =>
                setVariables({ ...variables, password: e.target.value })
              }
              className={errors.password && "is-invalid"}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.confirmPassword && "text-danger"}>
              {errors.confirmPassword ?? "confirm password"}
            </Form.Label>
            <Form.Control
              type="password"
              value={variables.confirmPassword}
              onChange={(e) =>
                setVariables({
                  ...variables,
                  confirmPassword: e.target.value,
                })
              }
              className={errors.confirmPassword && "is-invalid"}
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button disabled={loading} variant="success" type="submit">
              {loading ? "loading.." : "Register"}
            </Button>
            <br/>
            <small>Already have an account? <Link to='/login'>login</Link></small>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
