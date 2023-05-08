import { onValue, orderByChild, query, ref } from "firebase/database";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import { colors } from "../../common/color";
import { moneyFormat } from "../../common/money";
import { db, realTimeDatabase } from "../../config/firebase";
import useUser from "../../hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

import RcvMessage from "./RcvMessage";
import SndMessage from "./SndMessage";

const ChattingRoom = ({ product }) => {
  const user = useUser();
  const isMyAuction = user.uid === product.uid;
  // 투찰가 입력 인풋
  const [input, setInput] = useState("");
  const [biddingChat, setBiddingChat] = useState("");
  // 채팅 메시지 리스트
  const [chatList, setChatList] = useState([]);
  // 경매 현황: 최소, 최대 금액
  const [biddingMinPrice, setBiddingMinPrice] = useState(0);
  const [biddingMaxPrice, setBiddingMaxPrice] = useState(0);
  // 경매 현황 보임 여부
  const [openBidding, setOpenBidding] = useState(true);

  const onClickOpenBidding = () => {
    setOpenBidding(!openBidding);
  };

  const checkValidation = (minPrice, maxPrice) => {
    let ret = false;
    const regex = /^[0-9]+$/;

    if (biddingChat) {
      alert("투찰은 1회만 가능합니다.");
    } else if (!input) {
      alert("금액을 입력하세요");
    } else if (!regex.test(input)) {
      alert("숫자만 입력해주세요");
    } else if (input < minPrice) {
      alert(`${minPrice} 원부터 입력 가능합니다.`);
    } else if (input > maxPrice) {
      alert(`최대 ${maxPrice} 원까지 입력 가능합니다.`);
    } else if (input <= biddingMaxPrice) {
      alert(`${biddingMaxPrice} 원보다 큰 금액을 입력하세요.`);
    } else {
      ret = true;
    }

    return ret;
  };

  const handleChatSend = async () => {
    const productDB = db.collection("product").doc(product.id);
    const chatSetRef = realTimeDatabase.ref(
      `biddingChatRoom/${product.id}/${user.uid}`
    );

    const res = await productDB.get();
    const minPrice = res.data().minPrice;
    const maxPrice = res.data().maxPrice;

    const chat = {
      // 전송할 금액의 정보
      username: user.uid,
      nickname: user.displayName,
      biddingPrice: parseInt(input),
      timestamp: Date.now(),
    };

    if (!checkValidation(minPrice, maxPrice)) return;

    chatSetRef.set(chat);
    setInput("");
    const snapshot = await chatSetRef.get();
    setBiddingChat(snapshot.val().biddingPrice);
    alert(`${chat.biddingPrice} 원 투찰이 완료되었습니다!`);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      handleChatSend();
    }
  };

  useEffect(() => {
    const chatRef = realTimeDatabase
      .ref(`biddingChatRoom/${product.id}`)
      .orderByChild("timestamp");

    chatRef.on("value", (snapshot) => {
      const chats = [];
      snapshot.forEach((child) => {
        const message = child.val();
        chats.push({ key: child.key, ...message });
      });
      chats.sort((a, b) => a.timestamp - b.timestamp);

      const chatArray = [];
      let prices = [];
      if (chats) {
        prices = Object.values(chats).map((chat) => chat.biddingPrice);
        for (let id in chats) {
          chatArray.push({ id, ...chats[id] });
          if (chats[id].username === user.uid) {
            setBiddingChat(chats[id].biddingPrice);
          }
        }
      }

      setChatList(chatArray);
      if (prices.length <= 0) {
        setBiddingMinPrice(0);
        setBiddingMaxPrice(0);
      } else {
        setBiddingMinPrice(Math.min(...prices));
        setBiddingMaxPrice(Math.max(...prices));
      }
    });
  }, []);

  return (
    <Container>
      {openBidding ? (
        <CurrentAuctionDiv onClick={onClickOpenBidding}>
          <CurrentAuctionText>경매 현황</CurrentAuctionText>

          <BiddingPriceDiv>
            <BiddingLabel style={{ color: colors.COLOR_BLUE_TEXT }}>
              투찰 최소가
            </BiddingLabel>
            <BiddingPrice>{moneyFormat(biddingMinPrice)} 원</BiddingPrice>
          </BiddingPriceDiv>
          <BiddingPriceDiv>
            <BiddingLabel style={{ color: colors.COLOR_RED_TEXT }}>
              투찰 최대가
            </BiddingLabel>
            <BiddingPrice>{moneyFormat(biddingMaxPrice)} 원</BiddingPrice>
          </BiddingPriceDiv>
        </CurrentAuctionDiv>
      ) : (
        <CurrentAuctionIcon onClick={onClickOpenBidding}>
          <FontAwesomeIcon icon={faSackDollar} />
        </CurrentAuctionIcon>
      )}

      <ChattingWrap>
        <Chatting>
          {chatList.map((chat) =>
            chat.key === user.uid ? (
              <SndMessage
                key={`send${chat.id}_${chat.biddingPrice}`}
                chat={chat}
              />
            ) : (
              <RcvMessage
                key={`rcv${chat.id}_${chat.biddingPrice}`}
                chat={chat}
              />
            )
          )}
        </Chatting>
      </ChattingWrap>

      <InputBox>
        <Input
          value={input}
          disabled={isMyAuction || biddingChat}
          onChange={onChange}
          onKeyUp={onKeyUp}
          placeholder={
            isMyAuction
              ? "상품 등록자는 채팅에 참여할 수 없습니다."
              : biddingChat
              ? biddingChat
              : ""
          }
        />

        <SendBtn
          disabled={isMyAuction || biddingChat}
          onClick={isMyAuction ? () => {} : handleChatSend}
        >
          전송
        </SendBtn>
      </InputBox>
    </Container>
  );
};

export default ChattingRoom;

const Container = styled.div`
  box-sizing: border-box;
  width: 600px;
  height: max-content;
  border-radius: 5px;
  border: 2px solid ${colors.COLOR_MAIN};
  margin-left: 30px;
  position: relative;
`;

const CurrentAuctionIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 100;
  background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  color: ${colors.COLOR_MAIN};
  font-size: 20px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  box-shadow: 3px 7px 7px 0 rgba(176, 176, 176, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CurrentAuctionDiv = styled.div`
  position: absolute;
  top: 1%;
  left: 1%;
  z-index: 100;
  box-sizing: border-box;
  width: 98%;
  background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
  border-radius: 7px;
  box-shadow: 5px 10px 10px 0 rgba(176, 176, 176, 0.4);
  cursor: pointer;
`;

const CurrentAuctionText = styled.p`
  color: ${colors.COLOR_MAIN};
  font-weight: bold;
  font-size: 16px;
`;

const BiddingPriceDiv = styled.div`
  display: flex;
  align-items: center;
`;

const BiddingLabel = styled.p`
  font-size: 13px;
  margin-right: 10px;
  //   color: ${colors.COLOR_MAIN};
`;

const BiddingPrice = styled.p`
  font-weight: bold;
`;

const ChattingWrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  position: relative;

  background-image: url("/img/fandol.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 25%;
`;

const Chatting = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 10;
  padding: 15px;
`;

const InputBox = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Input = styled.input`
  border: 2px solid ${colors.COLOR_GREEN_BORDER};
  border-radius: 5px;
  background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  width: 70%;
  padding: 0 10px;
  line-height: 40px;

  ${({ disabled }) => {
    if (disabled) {
      return css`
        border-color: ${colors.COLOR_DARKGRAY_BACKGROUND};
        background-color: ${colors.COLOR_LIGHTGRAY_BACKGROUND};
      `;
    }
  }}
`;

const SendBtn = styled.div`
  border-radius: 5px;
  background-color: ${({ disabled }) =>
    disabled ? colors.COLOR_DARKGRAY_BACKGROUND : colors.COLOR_MAIN};
  color: white;
  font-weight: bold;
  line-height: 44px;
  text-align: center;
  width: 18%;
  cursor: pointer;
`;
