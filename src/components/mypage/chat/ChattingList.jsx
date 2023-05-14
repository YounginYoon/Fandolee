import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Filter from '../Filter';
import AuctionChattingBox from './AuctionChattingBox';
import ChattingBox from './ChattingBox';
import ExchangeChattingBox from './ExchangeChattingBox';
import useUser from '../../../hooks/useUser';
import { db, realTimeDatabase } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';
import Loading from '../../common/Loading';

const filterList = ['전체', '경매', '낙찰', '교환'];

const ChattingList = () => {
  const [filter, setFilter] = useState(filterList[0]);
  const user = useUser();
  const navigate = useNavigate();

  // 사용자가 참여한 경매 상품의 id 담음
  const [auctionChats, setAuctionChats] = useState(null);

  //상품의 title과 id를 배열에 저장
  const getAuctionList = async () => {
    const chatRef = realTimeDatabase.ref('biddingChatRoom');
    try {
      const products = await chatRef.once('value').then(async (snapshot) => {
        const promises = [];
        snapshot.forEach((child) => {
          child.forEach((data) => {
            const chat = data.val();

            // 사용자가 참여한 경매 채팅
            if (chat.username === user.uid) {
              const productRef = db.collection('product').doc(child.key).get();
              promises.push(productRef);
            }
          });
        });
        const docs = await Promise.all(promises);
        const products = docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }));
        return products;
      });

      setAuctionChats(products);
    } catch (err) {
      console.log('getAuctionList err: ', err);
    }
  };

  useEffect(() => {
    getAuctionList();
  }, []);

  if (!auctionChats) {
    return <Loading />;
  }

  return (
    <Container>
      <Filter filter={filter} setFilter={setFilter} filterList={filterList} />

      <ChattingWrapper>
        {auctionChats.map((chat) => (
          <AuctionChattingBox key={chat.id} id={chat.id} />
        ))}
      </ChattingWrapper>
    </Container>
  );
};

export default ChattingList;

const Container = styled.div`
  //   background-color: orange;
  width: 800px;
`;

const ChattingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`;
