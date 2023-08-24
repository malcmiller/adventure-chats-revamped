import io from "socket.io-client";
import { IconButton, Paper, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import {
  createChatMessage,
  getAllChatMessages,
} from "../../utilities/chat-api";

const socket = io.connect("http://localhost:3001");

function ChatWindow({ user }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  function sendMessage() {
    const userMessage = {
      nameOfUser: user.name,
      message,
    };
    socket.emit("send_message", userMessage);
    setMessages([...messages, userMessage]);
    setMessage("");
    createChatMessage(userMessage);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await getAllChatMessages();
      const responseMessages = response.data.map((m) => {
        return { nameOfUser: m.nameOfUser, message: m.message };
      });
      setMessages(responseMessages);
    }
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  return (
    <Box id="chat-window">
      <Box m={2}>
        {messages.map((m, i) => (
          <Typography
            style={{ color: m.nameOfUser === user.name ? "green" : "blue" }}
            key={i}
            variant="h6"
          >
            {`${m.nameOfUser}: ${m.message}`} <br />
          </Typography>
        ))}
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 500,
          position: "absolute",
          bottom: 0,
        }}
      >
        <TextField
          sx={{ ml: 1, flex: 1 }}
          label="Enter Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton type="button" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

export default ChatWindow;
