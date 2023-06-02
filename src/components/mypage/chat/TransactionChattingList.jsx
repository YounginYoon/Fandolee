import React, { useEffect, useState } from 'react';
import { db, realTimeDatabase } from '../../../config/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import Loading from '../../common/Loading';
import styled from 'styled-components';
import TransactionChattingBox from './TransactionChattingBox';
import EmptyList from '../EmptyList';

const TransactionChattingList = ({ user }) => {
  // 낙찰 후 거래 채팅의 상품 id 담음
  const [auctionTransaction, setAuctionTransaction] = useState(null);
  // 낙찰 거래 채팅 가져오기 (내가 올린 상품에서 포함)
  const getAuctionTransactionChats = async () => {
    const chatRef = realTimeDatabase.ref('ChatRoom/Auction');
    const productRef = query(collection(db, 'product'));
    try {
      const promises = [];
      const productsList = []; // 낙찰되거나 판매한 상품 담음
      const productDocs = await getDocs(productRef);
      await productDocs.forEach((doc) => {
        const data = doc.data();
        if (data.uid === user.uid || data.bidder === user.uid)
          productsList.push(doc.id);
      });
      await chatRef.once('value').then(async (snapshot) => {
        snapshot.forEach((child) => {
          productsList.forEach((productId) => {
            if (child.key === productId) promises.push(child.key);
          });
        });
      });
      // const products = await chatRef.once('value').then(async (snapshot) => {
      //   snapshot.forEach((child) => {
      //     child.forEach(async (snap) => {
      //       const chat = snap.val();
      //       if (chat.username === user.uid) {
      //         promises.push(child.key);
      //       }
      //     });
      //   });
      // });

      //   console.log("transaction chats: ", promises);
      setAuctionTransaction(promises);
    } catch (err) {
      console.log('getExchangeList err: ', err);
    }
  };

  useEffect(() => {
    getAuctionTransactionChats();
    //if (auctionTransaction) console.log(auctionTransaction);
  }, []);

  if (!auctionTransaction) {
    return <Loading />;
  }
  return (
    <>
      {auctionTransaction.length === 0 ? (
        <EmptyList text="채팅 내역이 없습니다." />
      ) : (
        auctionTransaction.map((productId) => (
          <TransactionChattingBox key={productId} productId={productId} />
        ))
      )}
    </>
  );
};

export default TransactionChattingList;
