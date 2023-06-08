import React, { useEffect, useState } from 'react';
import { db, realTimeDatabase } from '../../../config/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import Loading from '../../common/Loading';
import styled from 'styled-components';
import ExchangeChattingBox from './ExchangeChattingBox';
import useExchange from '../../../hooks/useExchange';
import EmptyList from '../EmptyList';

const ExchangeChattingList = ({ user }) => {
  // 사용자가 참여한 교환 상품의 id 담음
  const [exchangeChats, setExchangeChats] = useState(null);

  // 내가 참여한 교환 채팅 가져오기
  const getExchangeChats = async () => {
    const chatRef = realTimeDatabase.ref('ChatRoom/Exchange');
    try {
      const promises = [];
      await chatRef.once('value').then(async (snapshot) => {
        snapshot.forEach((child) => {
          child.forEach((snap) => {
            if (snap.key === user.uid) {
              promises.push(child.key);
            }
          });
        });
      });

      setExchangeChats(promises);
    } catch (err) {
      console.log('getExchangeList err: ', err);
    }
  };

  useEffect(() => {
    getExchangeChats();
  }, []);

  if (!exchangeChats) {
    return <Loading />;
  }

  return (
    <>
      {exchangeChats.length === 0 ? (
        <EmptyList text="채팅 내역이 없습니다." />
      ) : (
        exchangeChats.map((productId) => {
          return <ExchangeChattingBox key={productId} productId={productId} />;
        })
      )}
    </>
  );
};

export default ExchangeChattingList;
