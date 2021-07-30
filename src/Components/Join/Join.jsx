import React, { useState } from "react";
import { Link } from "react-router-dom";
import Chat from "../Chat/Chat";
import "./Join.scss";

let user;
const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};
const Join = () => {
  const [name, setName] = useState("");
  return (
    <div className="join-wrapper">
      <div className="join-container">
        <h1 className="">Join Chat</h1>
        <input
          type="text"
          placeholder="Enter Your Name"
          id="joinInput"
          onChange={(e) => setName(e.target.value)}
        />
        <Link
          onClick={(e) =>
            !name ? e.preventDefault() : null
          }
          to={`/chat`}
        >
          <div className="button-wrapper">
            <button onClick={sendUser}>Join</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
