import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";
import { useLocation } from "react-router-dom";

const ENDPOINT = "http://localhost:5000"; // Define constant

let socket;

const Chat = ({}) => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Join room
  useEffect(() => {
    console.log("location?.search  =============> ", location?.search);
    const { name, room } = queryString.parse(location?.search || "");

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location?.search]);

  // Listen for messages and room data
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.off("message");
      socket.off("roomData");
    };
  }, []);

  // Send message
  const sendMessage = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      if (message) {
        socket.emit("sendMessage", message, () => {
          setMessage("");
        });
      }
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
