import React from 'react';

const ChatPage = () => {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 container mx-auto mt-8">
        <div className="bg-white shadow-md rounded-lg w-2/4 h-[80vh] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center relative">
            <p className="text-lg font-semibold">Chat Name</p>
            <p id="online_count" className="text-sm absolute bottom-1 left-1/2 transform -translate-x-1/2">
              Online
            </p>
          </div>

          {/* Chat Messages */}
          <div id="chat_container" className="p-4 flex-1 overflow-y-auto">
            <div id="chatbox" className="mb-2">
              <ul id="chat_messages" className="flex flex-col justify-end gap-2 p-4"></ul>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <form
              id="chat_message_form"
              hx-ext="ws"
              ws-connect="/ws/chat/{{chat_name}}/"
              ws-send
              _="on htmx:wsAfterSend reset() me"
            >
            <div className="flex items-center">
            <input
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
    </>
  );
};

export default ChatPage;
