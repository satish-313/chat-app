import React from "react";
import { useAuthState } from "../context/contextAuth";
import moment from "moment";
import {OverlayTrigger,Tooltip} from 'react-bootstrap'

export default function Message({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.user;
  let otherChat = "py-2 px-3 rounded-pill bg-secondary";
  let chatclass = "py-2 px-3 rounded-pill bg-primary";
  let myChatDiv = "d-flex my-3";

  return (
    <OverlayTrigger
    key={message.uuid}
      placement={sent ? "left" : "right"}
      overlay={
        <Tooltip>
          {moment(message.createdAt).format("MMMM DD,YYYY @ h:mm a")}
        </Tooltip>
      }
    >
      <div
        className={`${sent ? myChatDiv + " ml-auto" : myChatDiv + " mr-auto"}`}
      >
        <div className={`${sent ? chatclass : otherChat}`}>
          <p className="text-white">{message.content}</p>
        </div>
      </div>
    </OverlayTrigger>
  );
}
