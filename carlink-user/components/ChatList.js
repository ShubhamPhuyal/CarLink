import { useState, useEffect } from "react";
import styled from "styled-components";

const ChatListWrapper = styled.div`
  width: 300px;
  border-right: 1px solid #ddd;
  padding: 10px;
`;

const ChatItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ChatList = ({ users, onSelect }) => {
  return (
    <ChatListWrapper>
      {users.map((user) => (
        <ChatItem key={user._id} onClick={() => onSelect(user)}>
          {user.name}
        </ChatItem>
      ))}
    </ChatListWrapper>
  );
};

export default ChatList;
