import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useAuthDispatch } from "../contextAuth";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      user
      createdAt
      imageUrl
      latestMessage {
        content
        from
        to
        createdAt
      }
    }
  }
`;

const GET_MESSAGES = gql`
  query GetMessages($from: String!) {
    getMessages(from: $from) {
      content
      from
      to
      createdAt
      uuid
    }
  }
`;

export default function Home(props) {
  const dispatch = useAuthDispatch();
  const [selectUser, setSelectUser] = useState(null);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    props.history.push("/login");
  };

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectUser) {
      getMessages({
        variables: { from: selectUser },
      });
    }
  }, [selectUser]);

  if (messagesData) {
    console.log("messagesData", messagesData);
  }

  const { loading, data, error } = useQuery(GET_USERS);

  if (error) {
    console.log(error);
  }

  if (data) {
    // console.log(data);
  }
  let userMarkup;
  if (!data || loading) {
    userMarkup = <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    userMarkup = <p>No user have joined</p>;
  } else if (data.getUsers.length !== 0) {
    userMarkup = data.getUsers.map((user) => (
      <div
        className="d-flex p-3"
        key={user.user}
        onClick={() => {
          // console.log(user.user)
          setSelectUser(user.user);
        }}
      >
        <div>
          <Image
            src={user.imageUrl}
            roundedCircle
            className="mr-2"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        </div>
        <div>
          <p className="text-success">{user.user}</p>
          <p className="font-weight-light">
            {user.latestMessage
              ? user.latestMessage.content
              : "You are now connected!"}
          </p>
        </div>
      </div>
    ));
  }

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
        <Col xs={4} className="p-0 sidecolor">
          {userMarkup}
        </Col>
        <Col xs={8}>
          {messagesData && messagesData.getMessages.length > 0 ? (
            messagesData.getMessages.map((m) => <p key={m.uuid}>{m.content}</p>)
          ) : (
            <p>You are connected</p>
          )}
        </Col>
      </Row>
    </>
  );
}
