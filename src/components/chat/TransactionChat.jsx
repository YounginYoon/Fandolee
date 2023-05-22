import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { realTimeDatabase } from '../../config/firebase';
import useUser from '../../hooks/useUser';
import useOwner from '../../hooks/useOwner';
import { useParams } from 'react-router-dom';

/*
 type == 1: auction
 type == 2: exchange
 */
const TransactionChat = ({ productId, type, onLastMessageChange }) => {
  const params = useParams();
  const user = useUser();
  //보낸 채팅
  const [input, setInput] = useState('');
  //채팅 리스트
  const [chatList, setChatList] = useState([]);

  // 상품 타입에 따른 채팅 ref
  const chatRef =
    type === 1
      ? realTimeDatabase.ref(`ChatRoom/Auction/${productId}`)
      : type === 2
      ? realTimeDatabase.ref(`ChatRoom/Exchange/${productId}/${params.id}`)
      : null;

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleChatSend();
    }
  };
  const handleChatSend = async () => {
    const chat = {
      username: user.uid,
      nickname: user.displayName,
      message: input,
      timestamp: Date.now(),
    };

    chatRef.push().set(chat);
    setInput('');
  };

  useEffect(() => {
    chatRef.on('value', async (snapshot) => {
      const chats = [];
      snapshot.forEach((child) => {
        const message = child.val();
        chats.push({ key: child.key, ...message });
      });
      chats.sort((a, b) => a.timestamp - b.timestamp);
      const chatArray = [];
      let messages = [];
      if (chats) {
        messages = Object.values(chats).map((chat) => chat.message);
        for (let id in chats) {
          chatArray.push({ id, ...chats[id] });
        }
      }
      setChatList(chatArray);
    });
  }, []);

  return (
    <div
      style={{
        width: '500px',
        height: '450px',
        border: '1px solid red',
        padding: '10px',
      }}
    >
      <div
        className="chatList"
        style={{ width: '500px', height: '400px', border: '1px solid blue' }}
      >
        {chatList.map((chat) => (
          <li
            key={chat.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems:
                user.uid === chat.username ? 'flex-end' : 'flex-start',
              margin: '10px',
            }}
          >
            {user.uid !== chat.username ? (
              <div>{chat.nickname}</div>
            ) : (
              <div></div>
            )}
            <div>{chat.message}</div>
          </li>
        ))}
      </div>
      <input value={input} onKeyUp={onKeyUp} onChange={onChange} />
      <button onClick={handleChatSend}>전송</button>
    </div>
  );
};

export default TransactionChat;
