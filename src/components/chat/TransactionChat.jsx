import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { realTimeDatabase } from "../../config/firebase";
import useUser from "../../hooks/useUser";
import useOwner from "../../hooks/useOwner";
import { useParams } from "react-router-dom";

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
} from "./chatStyledComponents";
import SndMessage from "./SndMessage";
import RcvMessage from "./RcvMessage";

/*
 type == 1: auction
 type == 2: exchange
 */
const TransactionChat = ({ productId, type, onLastMessageChange }) => {
  const params = useParams();
  const user = useUser();
  //보낸 채팅
  const [input, setInput] = useState("");
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
    if (e.key === "Enter") {
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
    setInput("");
  };

  useEffect(() => {
    chatRef.on("value", async (snapshot) => {
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
    <Container>
      <ChattingWrap>
        {/* {chatList.map((chat) =>
          chat.uid === chat.username ? (
            <SndMessage key={chat.id} chat={chat} />
          ) : (
            <RcvMessage key={chat.id} chat={chat} />
          )
        )} */}
      </ChattingWrap>

      <InputBox>
        <Input value={input} onKeyUp={onKeyUp} onChange={onChange} />
        <SendBtn onClick={handleChatSend}>전송</SendBtn>
      </InputBox>
    </Container>
  );
};

export default TransactionChat;
