import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function SocketIO() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef(null);
  let socket;

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io();
    }
    socket = socketRef.current;

    socket.on("newMessage", (msg) => {
      setMessages((m) => [...m, msg]);
    });

    return () => {
      socket.removeAllListeners("newMessage");
      socket.disconnect();
    };
  }, []);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessages((m) => [...m, message]);
    socketRef.current.emit("newMessage", message);
    setMessage("");
  }

  return (
    <div className="App">
      <h1>Welcome to chatapp</h1>
      <div>
        <ul>
          {messages.map((msg, idx) => (
            <li key={msg + idx}>{msg}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={message} />
        <button type="submit">Say Hello</button>
      </form>
    </div>
  );
}


