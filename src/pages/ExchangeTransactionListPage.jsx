import React from "react";
import styled from "styled-components";
import { colors } from "../common/color";

import { realTimeDatabase } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import ChattingHeader from "../components/chat/ChattingHeader";
import useExchange from "../hooks/useExchange";
import ChattingInfo from "../components/chat/ChattingInfo";
import Tag from "../components/common/Tag";
import ProductOwner from "../components/common/ProductOwner";
import { timestampToDateTimeFormat } from "../common/date";

const LastMessage = ({ productId, id }) => {
  const [lastMessage, setLastMessage] = useState({
    username: "",
    nickname: "",
    timestamp: 0,
    message: "",
  });

  const navigate = useNavigate();
  const goExchangeChat = () => {
    navigate(`/transaction/exchange/${productId}/${id}`);
  };

  const getLastMessage = async () => {
    try {
      const ref = realTimeDatabase.ref(`ChatRoom/Exchange/${productId}/${id}`);
      const snapshot = await ref.limitToLast(1).once("value");

      let message = {};
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        message = childData;
      });

      // console.log(message);
      setLastMessage(message);
    } catch (err) {
      console.log("getLastMessage err: ", err);
    }
  };

  useEffect(() => {
    getLastMessage();
  }, []);

  if (!lastMessage.username) {
    return <></>;
  }

  return (
    <LastMessageBox onClick={goExchangeChat}>
      <ProductOwner uid={lastMessage.username} />
      <Message>{lastMessage.message}</Message>
      <Date>{timestampToDateTimeFormat(lastMessage.timestamp)}</Date>
    </LastMessageBox>
  );
};

const ExchangeTransactionListPage = () => {
  const param = useParams();
  const productId = param.id;
  const product = useExchange(param.id);

  const [exchangeChats, setExchangeChats] = useState(null);

  // 교환 채팅 목록 가져옴
  const getExchangeList = async () => {
    try {
      const chatRef = realTimeDatabase.ref(`ChatRoom/Exchange/${productId}`);
      const promises = [];
      await chatRef.once("value").then(async (snapshot) => {
        snapshot.forEach((child) => {
          const exchange = {
            id: child.key,
          };
          promises.push(exchange);
        });
      });

      // console.log(promises);
      setExchangeChats(promises);
    } catch (err) {
      console.log("getExchangeList err: ", err);
    }
  };

  useEffect(() => {
    getExchangeList();
  }, []);

  if (!exchangeChats) {
    return <Loading />;
  }

  return (
    <>
      <ChattingHeader product={product} />

      <Wrapper>
        <ChattingInfo product={product}>
          <Tag
            label="거래방법"
            text={product.transactionType}
            textColor={colors.COLOR_MAIN}
          />
          <Tag
            label="지역"
            text={product.region}
            textColor={colors.COLOR_MAIN}
          />
        </ChattingInfo>

        <Messages>
          {exchangeChats.map((chat) => (
            <LastMessage key={chat.id} productId={productId} id={chat.id} />
          ))}
        </Messages>
      </Wrapper>
    </>
  );
};

export default ExchangeTransactionListPage;

const Wrapper = styled.div`
  //   background-color: whitesmoke;
  margin: 50px auto 300px;
  width: max-content;
  display: flex;
`;

const Messages = styled.div`
  box-sizing: border-box;
  width: 500px;
  height: 600px;
  border-radius: 5px;
  overflow-y: scroll;
  border: 2px solid ${colors.COLOR_MAIN};
  margin-left: 30px;
  padding: 5px;
`;

const LastMessageBox = styled.div`
  background-color: orange;
  padding: 5px 15px;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 5px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 5px 5px 10px 0 rgba(176, 176, 176, 0.3);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgba(176, 176, 176, 0.2);
  }
`;

const Message = styled.p`
  margin: 10px 0;
  font-size: 14px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled.p`
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
  color: ${colors.COLOR_GRAY_TEXT};
`;
