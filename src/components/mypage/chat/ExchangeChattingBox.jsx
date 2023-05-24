import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../../common/color';
import useExchange from '../../../hooks/useExchange';
import { db, realTimeDatabase } from '../../../config/firebase';

import ChattingBox from './ChattingBox';
import useUser from '../../../hooks/useUser';
import { timestampToDateTimeFormat } from '../../../common/date';
import useProduct from '../../../hooks/useProduct';

const ExchangeChattingBox = ({ productId }) => {
  const product = useExchange(productId);
  const navigate = useNavigate();
  const user = useUser();

  const [lastMessage, setLastMessage] = useState({
    username: '', // user id
    nickname: '', // 닉네임
    timestamp: 0,
    message: '',
  });

  const goChatPage = () => {
    navigate(`/transaction/exchange/${productId}/${user.uid}`);
  };

  const getLastMessage = async () => {
    const ref = realTimeDatabase.ref(
      `ChatRoom/Exchange/${productId}/${user.uid}`
    );

    try {
      const snapshot = await ref.limitToLast(1).once('value');
      let message = {};
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        // message = childData.message;
        message = { ...childData };
      });

      // console.log(message);
      setLastMessage(message);
    } catch (err) {
      console.log('getLastMessage err: ', err);
    }
  };

  useEffect(() => {
    getLastMessage();
  }, [productId]);

  if (!product) {
    return <></>;
  }

  return (
    <ChattingBox uid={product.uid} title={product.title} onClick={goChatPage}>
      <Wrapper>
        <Message>{lastMessage.message}</Message>

        <Date>{timestampToDateTimeFormat(lastMessage.timestamp)}</Date>
      </Wrapper>
    </ChattingBox>
  );
};

export default ExchangeChattingBox;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  //   background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Message = styled.p`
  font-size: 14px;
  width: 100%;
  color: ${colors.COLOR_DARKGRAY_TEXT};
  //   background-color: aqua;
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 20px;
`;

const Date = styled.p`
  height: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 11px;
  color: ${colors.COLOR_GRAY_TEXT};
`;
