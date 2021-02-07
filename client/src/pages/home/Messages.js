import React, { Fragment } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useMessageDispatch, useMessageState } from "../../context/message";
import Message from "../Message";

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

const SEND_MESSAGE = gql`
  mutation SendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      from
      createdAt
      to
      uuid
      content
    }
  }
`;

export default function Messages() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const [content, setContent] = React.useState("");
  const selectUser = users?.find((u) => u?.selected === true);
  const messages = selectUser?.messages;

  const [getMessages, { loading, data: messagesData }] = useLazyQuery(
    GET_MESSAGES
  );

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.log(err),
    onCompleted: (data) =>
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          user: selectUser,
          message: data.sendMessage,
        },
      }),
  });

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

  const submitMessage = (e) => {
    e.preventDefault();

    if (content.trim() === "" || !selectUser) return;
    setContent("");
    sendMessage({
      variables: {
        to: selectUser.user,
        content,
      },
    });
  };

  let selectedChatMarkup;
  if (!messages && !loading) {
    selectedChatMarkup = <p className="text-center mb-2">select a friend</p>;
  } else if (loading) {
    selectedChatMarkup = <p className="text-center mb-2">Loading..</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((m, index) => (
      <Fragment>
        <Message key={m.uuid} message={m} />
      </Fragment>
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = (
      <p className="text-center mb-2">
        Your are now connect send first message
      </p>
    );
  }

  return (
    <Col xs={10} md={8}>
      <div className="message-box d-flex flex-column-reverse">
        {selectedChatMarkup}
      </div>

      <Form onSubmit={submitMessage}>
        <Form.Group className="d-flex align-items-center">
          <Form.Control
            type="text"
            className="rounded-pill "
            placeholder="type a message.."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={submitMessage}>sumbit</Button>
        </Form.Group>
      </Form>
    </Col>
  );
}
