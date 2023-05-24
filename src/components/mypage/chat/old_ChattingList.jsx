import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "../Filter";
import AuctionChattingBox from "./AuctionChattingBox";
import ChattingBox from "./ChattingBox";
import ExchangeChattingBox from "./ExchangeChattingBox";
import useUser from "../../../hooks/useUser";
import { db, realTimeDatabase } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";

const filterList = ["경매", "낙찰", "교환"];

const ChattingList = () => {
  const [filter, setFilter] = useState(filterList[0]);
  const user = useUser();
  const navigate = useNavigate();

  // 사용자가 참여한 경매 상품의 id 담음
  const [auctionChats, setAuctionChats] = useState(null);
  // 사용자가 참여한 교환 상품의 id 담음
  const [exchangeChats, setExchangeChats] = useState(null);
  // 낙찰 후 거래 채팅의 상품 id 담음
  const [auctionTransaction, setAuctionTransaction] = useState(null);

  //상품의 title과 id를 배열에 저장
  const getAuctionList = async () => {
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
      console.log("getAuctionList err: ", err);
    }
  };

  // 교환 채팅 가져오기
  const getExchangeList = async () => {
    const chatRef = realTimeDatabase.ref("ChatRoom/Exchange");
    try {
      const promises = [];
      const products = await chatRef.once("value").then(async (snapshot) => {
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
      console.log("getExchangeList err: ", err);
    }
  };

  // 낙찰 거래 채팅 가져오기 (내가 올린 상품에서 포함)
  const getAuctionTransactionList = async () => {
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

      setAuctionTransaction(promises);
    } catch (err) {
      console.log("getExchangeList err: ", err);
    }
  };

  // 최신 메세지 띄우기
  /*
  type === 1 : auction
  type === 2 : exchange
  */
  const GetLastMessage = ({ productId, type }) => {
    const [lastMessage, setLastMessage] = useState("");
    useEffect(() => {
      const getLastMessage = async (type) => {
        const ref =
          type === 1
            ? realTimeDatabase.ref(`ChatRoom/Auction/${productId}`)
            : type === 2
            ? realTimeDatabase.ref(`ChatRoom/Exchange/${productId}/${user.uid}`)
            : null;

        try {
          const snapshot = await ref.limitToLast(1).once("value");
          let message = "";
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            message = childData.message;
          });
          setLastMessage(message);
        } catch (err) {
          console.log("getLastMessage err: ", err);
        }
      };

      if (type === 1) {
        getLastMessage(1);
      } else if (type === 2) {
        getLastMessage(2);
      }
    }, [productId, type]);

    return (
      <button
        onClick={() => goChatPage({ productId, type })}
        style={{ width: "100px" }}
      >
        {lastMessage}
      </button>
    );
  };

  const goChatPage = ({ productId, type }) => {
    if (type === 1) {
      navigate(`/transaction/auction/${productId}`);
    } else if (type === 2) {
      navigate(`/transaction/exchange/${productId}/${user.uid}`);
    }
  };

  useEffect(() => {
    getAuctionList();
    getExchangeList();
    getAuctionTransactionList();
  }, []);

  if (!auctionChats || !exchangeChats || !auctionTransaction) {
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
      {/* 교환 채팅 */}
      <div style={{ marginBottom: "30px", marginTop: "30px" }}>
        {exchangeChats.map((chat) => (
          <div key={chat}>
            <GetLastMessage productId={chat} type={2} />
          </div>
        ))}
      </div>
      {/* 낙찰 후 거래 채팅 */}
      {auctionTransaction.map((chat) => (
        <div key={chat}>
          <GetLastMessage productId={chat} type={1} />
        </div>
      ))}
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
