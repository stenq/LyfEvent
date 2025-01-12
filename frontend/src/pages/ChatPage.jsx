import React, { useContext, useEffect, useState , useRef} from "react";
import ChatMessage from "../components/ChatMessage";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  let { user, authTokens} = useContext(AuthContext);
  let { name } = useParams();
  let [messages, setMessages] = useState([]);
  let [onlineUsers, setOnlineUsers] = useState(0); 
  const [input, setInput] = useState(""); 
  const [ws, setWs] = useState(null); 
  const chatContainerRef = useRef(null)

  // Initialize WebSocket
  useEffect(() => {
    const token = authTokens.access;
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(
      `${protocol}://localhost:8000/ws/chat/${name}/?token=${encodeURIComponent(token)}`
  )

    socket.onopen = () => {
      console.log("WebSocket connected");
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "chat_message_handler") {
        const newMessage = data.message;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else if (data.type === "online_count_handler") {
        setOnlineUsers(data.online_count);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [name])


  useEffect(() => {
    getMessages();
  }, [name])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages])


  const getMessages = async () => {
    try {
      let response = await fetch(`/api/chat/${name}`);
      if (response.ok) {
        let chat_data = await response.json();
        setMessages(chat_data.chat_messages);
      } else {
        console.error("Failed to fetch messages:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (ws && input.trim()) {
      const data = {
        text: input,
        token: `Bearer ${authTokens.access}`,
      };
      ws.send(JSON.stringify(data));
      setInput(""); 
    }
  };
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 container mx-auto mt-8">
      <div className="bg-white shadow-md rounded-lg w-2/4 h-[80vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col">

        <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center relative">
          <p className="text-lg font-semibold">{name}</p>
          <p
            id="online_count"
            className="text-sm absolute bottom-1 left-1/2 transform -translate-x-1/2"
          >
            Online: {onlineUsers}
          </p>
        </div>

        <div id="chat_container" className="p-4 flex-1 overflow-y-auto" ref={chatContainerRef} >
          <div id="chatbox" className="mb-2">
            <ul id="chat_messages" className="flex flex-col justify-end gap-2 p-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  authorName={message.author_username}
                  content={message.text}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} id="chat_message_form">
            <div className="flex items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                name="text"
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
              />
              <button
                id="send-button"
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
