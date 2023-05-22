import React from 'react';
import styled from 'styled-components';

import { realTimeDatabase } from '../config/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';

const ExchangeTransactionListPage = () => {
  const param = useParams();
  const productId = param.id;
  const chatRef = realTimeDatabase.ref(`ChatRoom/Exchange/${productId}`);
  const [exchangeChats, setExchangeChats] = useState(null);

  const navigate = useNavigate();

  // 교환 채팅 목록 가져옴
  const getExchangeList = async () => {
    try {
      const promises = [];
      await chatRef.once('value').then(async (snapshot) => {
        snapshot.forEach((child) => {
          const exchange = {
            id: child.key,
          };
          promises.push(exchange);
        });
      });
      setExchangeChats(promises);
    } catch (err) {
      console.log('getExchangeList err: ', err);
    }
  };

  const goExchangeChat = (prop) => {
    navigate(`/transaction/exchange/${productId}/${prop}`);
  };

  // 최신 메세지를 화면에 띄움
  const GetLastMessage = ({ id }) => {
    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => {
      const getLastMessage = async () => {
        try {
          const ref = realTimeDatabase.ref(
            `ChatRoom/Exchange/${productId}/${id}`
          );
          const snapshot = await ref.limitToLast(1).once('value');
          let message = '';
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            message = childData.message;
          });
          setLastMessage(message);
        } catch (err) {
          console.log('getLastMessage err: ', err);
        }
      };

      getLastMessage();
    }, [id]);

    return <span>{lastMessage}</span>;
  };

  useEffect(() => {
    getExchangeList();
  }, []);

  if (!exchangeChats) {
    return <Loading />;
  }

  return (
    <Container>
      <div style={{ padding: '30px' }}>
        {exchangeChats.map((chat) => (
          <button
            style={{
              width: '500px',
              height: '100px',
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '20px',
            }}
            onClick={() => goExchangeChat(chat.id)}
            key={chat.id}
          >
            {<GetLastMessage id={chat.id} />}
          </button>
        ))}
      </div>
    </Container>
  );
};

export default ExchangeTransactionListPage;

const Container = styled.div`
  //   background-color: orange;
  width: 800px;
`;
