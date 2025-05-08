import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 800px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const UserList = styled.div`
  width: 30%;
  border-right: 1px solid #f0f0f0;
  overflow-y: auto;
  background-color: white;
`;

const UserItem = styled.div`
  padding: 12px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.2s;
  background-color: ${(props) => (props.selected ? "#f5f5f5" : props.unread ? "#f0f7ff" : "white")};
  border-bottom: 1px solid #f9f9f9;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const UserInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

const UserName = styled.div`
  font-weight: ${(props) => (props.unread ? "600" : "normal")};
`;

const LatestMessage = styled.div`
  font-size: 12px;
  color: #757575;
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
`;

const MessageTime = styled.div`
  font-size: 11px;
  color: #a0a0a0;
  white-space: nowrap;
`;

const UserStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4caf50;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DefaultAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;
  font-weight: bold;
`;

const ChatArea = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
`;

const ChatHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: white;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  position: relative;
  word-wrap: break-word;
  align-self: ${(props) => (props.isOwn ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isOwn ? "#3b82f6" : "white")};
  color: ${(props) => (props.isOwn ? "white" : "black")};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isOwn ? "row-reverse" : "row")};
  align-items: flex-end;
  gap: 8px;
  margin-bottom: 8px;
`;

const BubbleTime = styled.div`
  font-size: 11px;
  color: #a0a0a0;
  margin-top: 4px;
  text-align: ${(props) => (props.isOwn ? "right" : "left")};
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: white;
  border-top: 1px solid #f0f0f0;
`;

const InputBox = styled.input`
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  outline: none;
  
  &:focus {
    border-color: #3b82f6;
  }
`;

const SendButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
  
  &:hover {
    background-color: #2563eb;
  }
`;

// Helper function to format timestamp
const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Helper function to get initials
const getInitials = (name) => {
  if (!name) return "?";
  return name.split(' ').map(part => part[0]).join('').toUpperCase();
};

export default function Chat() {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [userLastMessages, setUserLastMessages] = useState({});
    const [unreadMessages, setUnreadMessages] = useState({});
    const messagesEndRef = useRef(null);
    const [userMessageCache, setUserMessageCache] = useState({});
  
    // Fetch users on mount
    useEffect(() => {
      fetchUsers();
    }, []);
  
    // Fetch messages for the selected user
    useEffect(() => {
      if (selectedUser) {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Polling every 3 seconds
        return () => clearInterval(interval);
      }
    }, [selectedUser]);
  
    // Check for new messages for all users periodically
    useEffect(() => {
      if (!session || users.length === 0) return;
  
      const checkAllUsersMessages = async () => {
        for (const user of users) {
          if (user._id !== selectedUser?._id) {
            await checkForNewMessages(user._id);
          }
        }
      };
  
      checkAllUsersMessages();
      const interval = setInterval(checkAllUsersMessages, 10000); // Check every 10 seconds
      return () => clearInterval(interval);
    }, [users, selectedUser, session]);
  
    // Auto-scroll to bottom when messages change
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    // Function to scroll to the bottom of the messages container
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    // Check for new messages for a specific user
    async function checkForNewMessages(userId) {
      if (!session) return;
  
      try {
        const response = await axios.get(`/api/chat/getMessage`, {
          params: {
            senderId: session.user.id,
            senderType: session.user.role === "admin" ? "User" : "FrontUser",
            receiverId: userId,
            receiverType: session.user.role === "admin" ? "FrontUser" : "User",
          },
        });
  
        const newMessages = response.data;
        const cachedMessages = userMessageCache[userId] || [];
  
        // If we have more messages than before, there are new messages
        if (newMessages.length > cachedMessages.length) {
          // Update cache
          setUserMessageCache((prev) => ({
            ...prev,
            [userId]: newMessages,
          }));
  
          // Find the latest message
          const latestMessage = newMessages[newMessages.length - 1];
  
          // Update the last message state
          setUserLastMessages((prev) => ({
            ...prev,
            [userId]: latestMessage,
          }));
  
          // If the last message is from the other user, mark as unread
          if (latestMessage.senderId !== session.user.id) {
            setUnreadMessages((prev) => ({
              ...prev,
              [userId]: true,
            }));
          }
        }
      } catch (error) {
        console.error("Error checking for new messages:", error);
      }
    }
  
    // Fetch users or admins based on the logged-in user's role
    async function fetchUsers() {
      try {
        const endpoint =
          session?.user?.role === "admin"
            ? "/api/users/getUsers"
            : "/api/users/getAdmins";
        const response = await axios.get(endpoint);
        setUsers(response.data);
  
        // Initialize message cache for each user
        const initialCache = {};
        for (const user of response.data) {
          initialCache[user._id] = [];
        }
        setUserMessageCache(initialCache);
  
        // Check for messages for each user
        for (const user of response.data) {
          await checkForNewMessages(user._id);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  
    // Fetch messages between the logged-in user and the selected user
    async function fetchMessages() {
      if (!session || !selectedUser) return;
  
      try {
        const response = await axios.get(`/api/chat/getMessage`, {
          params: {
            senderId: session.user.id,
            senderType: session.user.role === "admin" ? "User" : "FrontUser",
            receiverId: selectedUser._id,
            receiverType: session.user.role === "admin" ? "FrontUser" : "User",
          },
        });
  
        const newMessages = response.data;
        setMessages(newMessages);
  
        // Update cache
        setUserMessageCache((prev) => ({
          ...prev,
          [selectedUser._id]: newMessages,
        }));
  
        // If there are messages, update the last message for this user
        if (newMessages.length > 0) {
          const lastMsg = newMessages[newMessages.length - 1];
          setUserLastMessages((prev) => ({
            ...prev,
            [selectedUser._id]: lastMsg,
          }));
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  
    // Send a new message
    async function sendMessage() {
      if (!newMessage.trim()) return;
  
      try {
        await axios.post("/api/chat/sendMessage", {
          senderId: session.user.id,
          senderType: session.user.role === "admin" ? "User" : "FrontUser",
          receiverId: selectedUser._id,
          receiverType: session.user.role === "admin" ? "FrontUser" : "User",
          message: newMessage,
        });
  
        const sentMessage = {
          senderId: session.user.id,
          message: newMessage,
          createdAt: new Date().toISOString(),
        };
  
        // Optimistically update UI
        setMessages((prev) => [...prev, sentMessage]);
  
        // Update last message for this user
        setUserLastMessages((prev) => ({
          ...prev,
          [selectedUser._id]: sentMessage,
        }));
  
        // Clear input field
        setNewMessage("");
  
        // Refetch messages after a short delay to get server timestamps
        setTimeout(fetchMessages, 500);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  
    // Get truncated message preview
    const getMessagePreview = (message) => {
      if (!message) return "";
      return message.length > 28 ? message.substring(0, 25) + "..." : message;
    };
  
    // Sort users by the timestamp of their last message
    const sortedUsers = users.sort((a, b) => {
      const lastMessageA = userLastMessages[a._id]?.createdAt || 0;
      const lastMessageB = userLastMessages[b._id]?.createdAt || 0;
      return new Date(lastMessageB) - new Date(lastMessageA); // Sort in descending order
    });
  
    return (
      <Container>
        <UserList>
          {sortedUsers.map((user) => {
            const lastMessage = userLastMessages[user._id];
            const isUnread = unreadMessages[user._id];
  
            return (
              <UserItem
                key={user._id}
                onClick={() => setSelectedUser(user)}
                selected={selectedUser?._id === user._id}
                unread={isUnread}
              >
                {user.profileImage ? (
                  <UserAvatar>
                    <img src={user.profileImage} alt={user.name} />
                  </UserAvatar>
                ) : (
                  <DefaultAvatar>{getInitials(user.name)}</DefaultAvatar>
                )}
                <UserInfo>
                  <UserName unread={isUnread}>{user.name}</UserName>
                  {lastMessage && (
                    <LatestMessage>
                      {lastMessage.senderId === session?.user?.id ? "You: " : ""}
                      {getMessagePreview(lastMessage.message)}
                    </LatestMessage>
                  )}
                </UserInfo>
                {lastMessage && (
                  <MessageTime>{formatTime(lastMessage.createdAt)}</MessageTime>
                )}
              </UserItem>
            );
          })}
        </UserList>
  
        {/* Chat Area (keep this part unchanged) */}
        <ChatArea>
          {selectedUser ? (
            <>
              <ChatHeader>
                {selectedUser.profileImage ? (
                  <UserAvatar>
                    <img src={selectedUser.profileImage} alt={selectedUser.name} />
                  </UserAvatar>
                ) : (
                  <DefaultAvatar>{getInitials(selectedUser.name)}</DefaultAvatar>
                )}
                <div>
                  <div style={{ fontWeight: "bold" }}>{selectedUser.name}</div>
                  {selectedUser.online && (
                    <div style={{ fontSize: "12px", color: "#757575" }}>
                      <UserStatus>
                        <StatusDot />
                        <span>Online</span>
                      </UserStatus>
                    </div>
                  )}
                </div>
              </ChatHeader>
  
              <MessagesContainer>
                {messages.map((msg, index) => {
                  const isOwn = msg.senderId === session?.user?.id;
                  return (
                    <div key={index}>
                      <MessageGroup isOwn={isOwn}>
                        {!isOwn && (
                          selectedUser.profileImage ? (
                            <UserAvatar style={{ width: "30px", height: "30px" }}>
                              <img src={selectedUser.profileImage} alt={selectedUser.name} />
                            </UserAvatar>
                          ) : (
                            <DefaultAvatar style={{ width: "30px", height: "30px", fontSize: "12px" }}>
                              {getInitials(selectedUser.name)}
                            </DefaultAvatar>
                          )
                        )}
                        <MessageBubble isOwn={isOwn}>
                          {msg.message}
                        </MessageBubble>
                      </MessageGroup>
                      <BubbleTime isOwn={isOwn}>
                        {formatTime(msg.createdAt)}
                      </BubbleTime>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </MessagesContainer>
  
              <InputArea>
                <InputBox
                  type="text"
                  placeholder="Type Message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <SendButton onClick={sendMessage}>→</SendButton>
              </InputArea>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#757575",
              }}
            >
              Select a user to start chatting
            </div>
          )}
        </ChatArea>
      </Container>
    );
  }