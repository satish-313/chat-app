import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../context/contextAuth";

const LOGIN_USER = gql`
  query register($user: String!, $password: String!) {
    login(user: $user, password: $password) {
      user
      email
      token
    }
  }
`;

export default function Login(props) {
  const [variables, setVariables] = useState({
    user: "",
    password: "",
  });

  const dispatch = useAuthDispatch();

  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError(err) {
      // console.log(err.graphQLErrors[0].extensions);
      setErrors(err.graphQLErrors[0].extensions);
    },
    onCompleted(data) {
      dispatch({ type: "LOGIN", payload: data.login });
      props.history.push("/");
    },
  });

  const submitLoginForm = (e) => {
    e.preventDefault();
    loginUser({ variables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Register</h1>
        <Form onSubmit={submitLoginForm}>
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
          <div className="text-center">
            <Button disabled={loading} variant="success" type="submit">
              {loading ? "loading.." : "Login"}
            </Button>
            <br />
            <small>
              Don't have an account? <Link to="/register">signup</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
