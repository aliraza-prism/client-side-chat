import React, { useEffect, useState } from "react";
import { user } from "./../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.scss";
import Message from "../Message/Message";
import ReactscrollToBottom from "react-scroll-to-bottom";
import { ImCross } from "react-icons/im";

let socket;
const ENDPOINT = "http://localhost:4000/";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  //Messages Function
  const send = () => {
    const message =
      document.getElementById("inputField").value;
    socket.emit("message", { message, id });
    document.getElementById("inputField").value = "";
  };
  useEffect(() => {
    socket = socketIo(ENDPOINT, {
      transports: [`websocket`],
    });

    socket.on("connect", () => {
      setId(socket.id);
    });
    socket.emit("joined", { user });
    // welcome from admin
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
    });
    // new user joined notification
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
    });
    // user leave
    socket.on("leave", (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      // socket.emit("disconnect");
      socket.disconnect();
      socket.off();
    };
  }, []);
  //! Chat Functionality
  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chatbox</h2>
          <a href="/" className="cross-icon">
            <ImCross />
          </a>
        </div>
        <ReactscrollToBottom className="chat-box">
          {messages?.map((x, index) => (
            <Message
              key={index}
              user={x.id === id ? "" : x.user}
              message={x.message}
              classs={x.id === id ? "right" : "left"}
            />
          ))}
        </ReactscrollToBottom>
        <div className="input-box-wrapper">
          <input
            type="text"
            id="inputField"
            onKeyPress={(e) =>
              e.key === "Enter" ? send() : null
            }
          />
          <button onClick={send} type="submit">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
