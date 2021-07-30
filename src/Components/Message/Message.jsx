import React from "react";
import "./Message.scss";

const Message = ({ user, message, classs }) => {
  if (user) {
    return (
      <div className={`message-wrapper ${classs}`}>
        <h6>{`${user}: ${message}`}</h6>
      </div>
    );
  } else {
    return (
      <div className={`message-wrapper ${classs}`}>
        <h6>{`You: ${message}`}</h6>
      </div>
    );
  }
};

export default Message;
