import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Col, Image } from "react-bootstrap";
import { useMessageDispatch, useMessageState } from "../../context/message";

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

export default function User() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectUser = users?.find(u => u?.selected === true)
  
  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) =>
      dispatch({ type: "SET_USERS", payload: data.getUsers }),
    onError: (err) => console.log(err),
  });

  let userMarkup;
  if (!users || loading) {
    userMarkup = <p>Loading...</p>;
  } else if (users.length === 0) {
    userMarkup = <p>No user have joined</p>;
  } else if (users.length !== 0) {
    userMarkup = users.map((user) => {
      let classForActive = "d-flex p-3 user-hover";

      return (
        <div
          role="button"
          // className={classForActive}
          className={`${user.user === selectUser?.user ? classForActive + " active-user" : classForActive}`}
          key={user.user}
          onClick={() => {
            // console.log(user.user)
            dispatch({type: 'SET_SELECTED_USER', payload: user.user})
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
      );
    });
  }

  return (
    <Col xs={4} className="p-0 sidecolor">
      {userMarkup}
    </Col>
  );
}
