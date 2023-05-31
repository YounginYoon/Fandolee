import React, { useEffect, useState } from "react";
import { db, realTimeDatabase } from "../../../config/firebase";
import Loading from "../../common/Loading";
import styled from "styled-components";
import TransactionChattingBox from "./TransactionChattingBox";
import EmptyList from "../EmptyList";

const TransactionChattingList = ({ user }) => {
  // 낙찰 후 거래 채팅의 상품 id 담음
  const [auctionTransaction, setAuctionTransaction] = useState(null);
  // 낙찰 거래 채팅 가져오기 (내가 올린 상품에서 포함)
  const getAuctionTransactionChats = async () => {
    const chatRef = realTimeDatabase.ref("ChatRoom/Auction");
    try {
      const promises = [];
      const products = await chatRef.once("value").then(async (snapshot) => {
        snapshot.forEach((child) => {
          child.forEach(async (snap) => {
            const chat = snap.val();
            if (chat.username === user.uid) {
              promises.push(child.key);
            }
          });
        });
      });

      //   console.log("transaction chats: ", promises);
      setAuctionTransaction(promises);
    } catch (err) {
      console.log("getExchangeList err: ", err);
    }
  };

  useEffect(() => {
    getAuctionTransactionChats();
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
