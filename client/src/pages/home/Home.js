import React, { useState } from "react";
import { Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../../context/contextAuth";
import User from "./User";
import Messages from "./Messages";

export default function Home() {
  const dispatch = useAuthDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href="/login"
  };

  return (
    <>
      <Row className="mb-1 bg-white justify-content-around">
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
        <Link to="/login">
          <Button variant="link">register</Button>
        </Link>
        <Button variant="link" onClick={logout}>
          Logout
        </Button>
      </Row>
      <Row className="bg-white">
        <User />
        <Messages />
      </Row>
    </>
  );
}
