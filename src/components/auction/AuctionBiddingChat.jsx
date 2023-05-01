import React from 'react';

import styled from 'styled-components';

import { db, realTimeDatabase } from '../../config/firebase';
import { useEffect } from 'react';
import { useState } from 'react';

import useUser from '../../hooks/useUser';

const AuctionBiddingChat = ({ productData }) => {
  const user = useUser();
  const chatRef = realTimeDatabase
    .ref(`biddingChatRoom/${productData.id}`)
    .orderByChild('biddingPrice');
  const product = db.collection('product').doc(productData.id);

  const [chatText, setChatText] = useState('');
  const [chatList, setChatList] = useState([]);
  const [biddingChat, setBiddingChat] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const chatRef = realTimeDatabase
      .ref(`biddingChatRoom/${productData.id}`)
      .orderByChild('timestamp');
    chatRef.on('value', (snapshot) => {
      const chats = snapshot.val();
      const chatArray = [];
      const prices = Object.values(chats).map((chat) => chat.biddingPrice);
      for (let id in chats) {
        chatArray.push({ id, ...chats[id] });
        if (chats[id].username === user.uid) {
          setBiddingChat(chats[id].biddingPrice);
        }
      }
      setChatList(chatArray);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
      //console.log(prices);
    });
  }, []);

  const handleChatSend = () => {
    const chatSetRef = realTimeDatabase.ref(
      `biddingChatRoom/${productData.id}/${user.uid}`
    );
    product.get().then((res) => {
      const minPrice = res.data().minPrice;
      const maxPrice = res.data().maxPrice;
      const latestPrice =
        chatList.length > 0
          ? chatList[chatList.length - 1].biddingPrice
          : minPrice;

      const chat = {
        // 전송할 금액의 정보를 담음
        username: user.uid,
        biddingPrice: parseInt(chatText),
        timestamp: Date.now(),
      };
      if (!chat.biddingPrice) {
        window.confirm('금액을 입력하세요');
        return;
      } else if (chat.biddingPrice < minPrice) {
        window.confirm(`${minPrice}원부터 입력 가능합니다.`);
        return;
      } else if (chat.biddingPrice > maxPrice) {
        window.confirm(`${maxPrice}원보다 작은 금액을 입력하세요.`);
        return;
      } else if (chat.biddingPrice <= latestPrice) {
        window.confirm(`${latestPrice}원보다 큰 금액을 입력하세요.`);
        return;
      } else {
        chatSetRef.set(chat);
        setChatText('');
        chatSetRef.get().then((snapshot) => {
          setBiddingChat(snapshot.val().biddingPrice);
        });
        window.confirm(`${chat.biddingPrice}원 투찰이 완료되었습니다!`);
      }
    });
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleChatSend();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ width: '1000px', border: 'solid red 1px' }}>
        <div style={{ padding: '10px' }}>
          <p>경매 현황</p>
          <p>투찰 최소가: {minPrice}</p>
          <p>투찰 최대가: {maxPrice}</p>
        </div>
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
            <div>{chat.username}</div>
            <div>{chat.biddingPrice}</div>
          </li>
        ))}
        {biddingChat ? (
          <div>
            <input value={chatText} placeholder={biddingChat} disabled />
            <button onClick={handleChatSend} disabled>
              전송
            </button>
          </div>
        ) : (
          <div>
            <input
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              onKeyUp={onKeyUp}
            />
            <button onClick={handleChatSend}>전송</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionBiddingChat;
