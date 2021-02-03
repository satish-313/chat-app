import React from "react";
import { Col } from "react-bootstrap";
import { gql, useLazyQuery } from "@apollo/client";
import { useMessageDispatch, useMessageState } from "../../context/message";

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

export default function Messages() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectUser = users?.find((u) => u?.selected === true);
  const messages = selectUser?.messages;

  const [getMessages, { loading, data: messagesData }] = useLazyQuery(
    GET_MESSAGES
  );

  React.useEffect(() => {
    if (selectUser && !selectUser.messages) {
      getMessages({
        variables: { from: selectUser.user },
      });
    }
  }, [selectUser]);

  React.useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          user: selectUser.user,
          messages: messagesData.getMessages,
        },
      });
    }
  }, [messagesData]);

  let selectedChatMarkup;
  if (!messages && !loading) {
    selectedChatMarkup = <p>select a friend</p>;
  } else if (loading) {
    selectedChatMarkup = <p>Loading..</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((m) => <p key={m.uuid}>{m.content}</p>);
  } else if (messages.length === 0) {
    selectedChatMarkup = <p>Your are now connect send first message</p>;
  }

  return <Col xs={8}>{selectedChatMarkup}</Col>;
}
