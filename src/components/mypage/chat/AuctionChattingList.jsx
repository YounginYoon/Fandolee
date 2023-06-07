import React, { useEffect, useState } from "react";
import { db, realTimeDatabase } from "../../../config/firebase";
import Loading from "../../common/Loading";
import styled from "styled-components";

import AuctionChattingBox from "./AuctionChattingBox";
import EmptyList from "../EmptyList";

const AuctionChattingList = ({ user }) => {
  const [auctionChats, setAuctionChats] = useState(null);

  const getAuctionChats = async () => {
    const chatRef = realTimeDatabase.ref("biddingChatRoom");

    try {
      const products = await chatRef.once("value").then(async (snapshot) => {
        const promises = [];
        snapshot.forEach((child) => {
          child.forEach((data) => {
            const chat = data.val();

            // 사용자가 참여한 경매 채팅
            if (chat.username === user.uid) {
              const productRef = db.collection("product").doc(child.key).get();
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
      console.log("getAuctioinChats err: ", err);
    }
  };

  useEffect(() => {
    getAuctionChats();
  }, []);

  if (!auctionChats) {
    return <Loading />;
  }

  return (
    <>
      {auctionChats.length === 0 ? (
        <EmptyList text="채팅 내역이 없습니다." />
      ) : (
        auctionChats.map((chat) => (
          <AuctionChattingBox key={chat.id} id={chat.id} />
        ))
      )}
    </>
  );
};

export default React.memo(AuctionChattingList);
