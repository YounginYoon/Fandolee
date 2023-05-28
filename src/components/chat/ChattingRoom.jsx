import { onValue, orderByChild, query, ref } from 'firebase/database';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../common/color';
import { moneyFormat } from '../../common/money';
import { db, realTimeDatabase } from '../../config/firebase';
import useUser from '../../hooks/useUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBahtSign, faSackDollar } from '@fortawesome/free-solid-svg-icons';

import RcvMessage from './RcvMessage';
import SndMessage from './SndMessage';
import { remainDate } from '../../common/date';

import {
  Container,
  CurrentAuctionDiv,
  CurrentAuctionIcon,
  CurrentAuctionText,
  BiddingPriceDiv,
  BiddingLabel,
  BiddingPrice,
  ChattingWrap,
  Chatting,
  InputBox,
  CannotInput,
  Input,
  SendBtn,
} from './chatStyledComponents';

const ChattingRoom = ({ product, setShowAuctionModal }) => {
  const user = useUser();
  const isMyAuction = user.uid === product.uid;

  // 투찰가 입력 인풋
  const [input, setInput] = useState('');
  const [biddingChat, setBiddingChat] = useState('');
  // 채팅 메시지 리스트
  const [chatList, setChatList] = useState([]);
  // 경매 현황: 최소, 최대 금액
  const [biddingMinPrice, setBiddingMinPrice] = useState(0);
  const [biddingMaxPrice, setBiddingMaxPrice] = useState(0);
  // 경매 현황 보임 여부
  const [openBidding, setOpenBidding] = useState(true);
  const productDB = db.collection('product').doc(product.id);
  // 낙찰 현황
  const [complete, setComplete] = useState(0);

  const onClickOpenBidding = () => {
    setOpenBidding(!openBidding);
  };

  const checkValidation = (minPrice, maxPrice) => {
    let ret = false;
    const regex = /^[0-9]+$/;

    if (biddingChat) {
      alert('투찰은 1회만 가능합니다.');
    } else if (!input) {
      alert('금액을 입력하세요');
    } else if (!regex.test(input)) {
      alert('숫자만 입력해주세요');
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

    if (!checkValidation(minPrice, maxPrice)) return; //

    chatSetRef.set(chat);
    setInput('');
    const snapshot = await chatSetRef.get();
    setBiddingChat(snapshot.val().biddingPrice);
    await alert(`${chat.biddingPrice} 원 투찰이 완료되었습니다!`);

    if (chat.biddingPrice === maxPrice) {
      // 최대가 투찰 시 낙찰
      await productDB.update({ isComplete: 1 });
      setComplete(1);
      setShowAuctionModal(true);
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleChatSend();
    }
  };

  useEffect(() => {
    const chatRef = realTimeDatabase
      .ref(`biddingChatRoom/${product.id}`)
      .orderByChild('timestamp');

    chatRef.on('value', async (snapshot) => {
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
        const findMax = Math.max(...prices);
        const maxBidder = chats.find(
          (chat) => chat.biddingPrice === findMax
        )?.username;
        if (maxBidder) {
          await productDB.update({
            biddingPrice: findMax,
            bidder: maxBidder,
          });
        }
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
          {chatList.length > 0 &&
            chatList.map((chat) =>
              chat.key === user.uid ? (
                <SndMessage
                  key={`send${chat.id}_${chat.biddingPrice}`}
                  message={moneyFormat(chat.biddingPrice)}
                  timestamp={chat.timestamp}
                />
              ) : (
                <RcvMessage
                  key={`rcv${chat.id}_${chat.biddingPrice}`}
                  message={moneyFormat(chat.biddingPrice)}
                  timestamp={chat.timestamp}
                  nickname={chat.nickname}
                />
              )
            )}
        </Chatting>
      </ChattingWrap>

      <InputBox>
        {complete || product.isComplete ? (
          <CannotInput>낙찰이 완료된 상품입니다.</CannotInput>
        ) : remainDate(product.endDate) < 0 ? (
          <CannotInput>경매 기간이 아닙니다.</CannotInput>
        ) : null}
        <Input
          value={input}
          disabled={isMyAuction || biddingChat}
          onChange={onChange}
          onKeyUp={onKeyUp}
          placeholder={
            isMyAuction
              ? '상품 등록자는 채팅에 참여할 수 없습니다.'
              : biddingChat
              ? biddingChat
              : ''
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
