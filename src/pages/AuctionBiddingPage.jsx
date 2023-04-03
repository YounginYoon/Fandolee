import { async } from '@firebase/util';
//import { push, ref } from '@firebase/database';
import React, { useState, useRef } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { json, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../common/color';

import { db, authService, storage, realTimeDatabase } from '../config/firebase';
import useUser from '../hooks/useUser';

const AuctionBiddingPage = () => {
  const user = useUser();
  const [biddingPrice, setBiddingPrice] = useState(''); // 사용자가 입력한 가격을 파이어베이스에 보내기 위해 담는 변수
  const [receivePrices, setReceivePrices] = useState([]); // 다른 사용자로부터 투찰가 받아오기
  const scrollRef = useRef(); // 스크롤을 맨 아래로 내리기 위해 참조
  const [sendPrice, setSendPrice] = useState('');
  const DBref = realTimeDatabase
    .ref('biddingChat')
    .orderByChild('biddingPrice');

  async function searchEqualData(data) {
    await DBref.equalTo(data)
      .limitToFirst(1)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          //console.log(child.val().biddingPrice);
          sessionStorage.setItem('biddingPrice', child.val().biddingPrice);
          setSendPrice(sessionStorage.getItem('biddingPrice'));
        });
      });
  }

  //메시지 전송, product id로 이름 변경 필요
  const sendChat = async (data) => {
    if (!data.biddingPrice) {
      window.confirm('금액을 입력하세요!');
      return;
    } else {
      const priceInfo = {
        biddingPrice: data.biddingPrice,
        timestamp: data.timestamp,
        uid: data.uid,
      };
      try {
        await DBref.equalTo(data.biddingPrice)
          .limitToFirst(1)
          .once('value')
          .then((snapshot) => {
            snapshot.forEach((child) => {
              if (child.val().biddingPrice === data.biddingPrice) {
                return window.confirm('이미 투찰된 금액 입니다.');
              } else throw new Error('no same');
            });
          });
        await DBref.limitToLast(1)
          .once('value')
          .then((snapshot) => {
            snapshot.forEach((child) => {
              if (child.val().biddingPrice >= data.biddingPrice) {
                var errorMessage = child.val().biddingPrice;
                errorMessage += '원보다 큰 금액을 입력하세요.';
                return window.confirm(errorMessage);
              } else throw new Error('bigger than max');
            });
          });
      } catch (err) {
        console.log(err);
        await realTimeDatabase
          .ref(`biddingChat/${user.uid}`)
          .set(priceInfo)
          .then(() => {
            searchEqualData(data.biddingPrice);
            //sessionStorage.setItem('biddingPrice', data.biddingPrice);
            window.confirm('투찰이 완료되었습니다!');
          });
      }
    }
  };

  //버튼 클릭시 전송
  const handleSubmitChat = async (e) => {
    //파이어베이스 realtime database에 값 저장
    e.preventDefault();

    try {
      await sendChat({
        biddingPrice: parseInt(biddingPrice),
        timestamp: Date.now(),
        uid: user.uid,
      });
      setSendPrice(sessionStorage.getItem('biddingPrice'));
    } catch (error) {
      console.log(error);
    }
  };

  // 메시지 가져오기
  const getChats = () => {
    let receivePriceList = [];
    realTimeDatabase
      .ref('biddingChat')
      .orderByChild('timestamp')
      .on('value', (snapshot) => {
        snapshot.forEach((row) => {
          receivePriceList.push(row.val());
          if (row.val().uid === user.uid)
            searchEqualData(row.val().biddingPrice);
        });
      });
    return receivePriceList;
  };

  const getChatList = () => {
    const receivePriceList = getChats();
    setReceivePrices(receivePriceList);
  };

  const handleOnChange = (e) => {
    setBiddingPrice(e.target.value);
  };

  const CreatePriceDiv = (value, index) => {
    try {
      if (value.uid === user.uid) {
        return (
          <div className="createPriceDiv" key={index}>
            <li
              className="priceTextLi"
              style={{
                listStyle: 'none',
                textAlign: 'right',
                marginBottom: '10px',
              }}
            >
              {value.biddingPrice}
            </li>
          </div>
        );
      } else throw new Error('different uid!');
    } catch (err) {
      //console.log(err);
      return (
        <div className="createPriceDiv" key={index}>
          <li
            className="priceTextLi"
            style={{
              listStyle: 'none',
              textAlign: 'left',
              marginBottom: '10px',
            }}
          >
            {value.biddingPrice}
          </li>
        </div>
      );
    }
  };

  useEffect(() => {
    try {
      realTimeDatabase.ref('biddingChat').on('child_added', getChatList);
      realTimeDatabase.ref('biddingChat').on('child_changed', getChatList);
      setSendPrice(sessionStorage.getItem('biddingPrice'));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="chatWrapper" style={{ margin: '50px' }}>
      <div
        className="priceDiv"
        ref={scrollRef}
        //onChange={getChatList}
        style={{
          width: '400px',
          overflow: 'auto',
          height: '200px',
          border: '1px solid red',
        }}
      >
        {receivePrices.map((value, index) => CreatePriceDiv(value, index))}
      </div>
      <div className="chatSendDiv">
        {sendPrice ? (
          <form>
            <input placeholder={sendPrice} disabled />
            <button type="submit" disabled>
              전송
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitChat}>
            <input
              placeholder="투찰할 금액을 입력하세요."
              value={biddingPrice}
              onChange={handleOnChange}
            />
            <button type="submit">전송</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuctionBiddingPage;
