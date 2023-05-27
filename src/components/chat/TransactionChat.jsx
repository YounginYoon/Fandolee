import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { realTimeDatabase, db } from '../../config/firebase';
import useUser from '../../hooks/useUser';
import useOwner from '../../hooks/useOwner';
import { useParams } from 'react-router-dom';

import {
  Container,
  CurrentAuctionDiv,
  CurrentAuctionIcon,
  CurrentAuctionText,
  BiddingPriceDiv,
  BiddingLabel,
  BiddingPrice,
  ChattingWrap,
  Chatting,
  InputBox,
  CannotInput,
  Input,
  SendBtn,
} from './chatStyledComponents';
import SndMessage from './SndMessage';
import RcvMessage from './RcvMessage';
import Loading from '../common/Loading';

/*
 type == 1: auction
 type == 2: exchange
 */
const TransactionChat = ({ productId, type, onLastMessageChange, product }) => {
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
    if (!input) {
      return;
    }
    const chat = {
      username: user.uid,
      nickname: user.displayName,
      message: input,
      timestamp: Date.now(),
    };

    chatRef.push().set(chat);
    setInput('');
  };

  const getChatList = async () => {
    chatRef.on('value', async (snapshot) => {
      const chats = [];
      snapshot.forEach((child) => {
        const message = child.val();
        chats.push({ key: child.key, ...message });
      });
      chats.sort((a, b) => a.timestamp - b.timestamp);
      // setChatList(chats);
      const chatArray = [];
      // let messages = [];
      if (chats) {
        // messages = Object.values(chats).map((chat) => chat.message);

        for (let id in chats) {
          chatArray.push({ id, ...chats[id] });
        }
      }

      //console.log("chatArray: ", chatArray);
      setChatList(chatArray);
    });
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <Container>
      <ChattingWrap>
        <Chatting>
          {chatList.length > 0 &&
            chatList.map((chat) =>
              user.uid === chat.username ? (
                <SndMessage
                  key={chat.id}
                  message={chat.message}
                  timestamp={chat.timestamp}
                />
              ) : (
                <RcvMessage
                  key={chat.id}
                  message={chat.message}
                  timestamp={chat.timestamp}
                  nickname={chat.nickname}
                />
              )
            )}
        </Chatting>
      </ChattingWrap>

      <InputBox>
        {product && type === 2 && product.isComplete === 1 && (
          <CannotInput>거래가 완료되었습니다.</CannotInput>
        )}
        {product && type === 1 && product.completeTransaction === 1 && (
          <CannotInput>거래가 완료되었습니다.</CannotInput>
        )}

        <Input value={input} onKeyUp={onKeyUp} onChange={onChange} />
        <SendBtn onClick={handleChatSend}>전송</SendBtn>
      </InputBox>
    </Container>
  );
};

export default TransactionChat;
