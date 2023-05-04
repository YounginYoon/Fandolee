import React from 'react';

import styled from 'styled-components';
import { db, storage } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

import useUser from '../../hooks/useUser';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { realTimeDatabase } from '../../config/firebase';

import CompleteButton from './CompleteButton';

const ProductChatInfo = ({ productData, postingMode }) => {
  const getDataID = useParams();
  const dataID = getDataID.id;
  const user = useUser();

  const [biddingMaxPrice, setBiddingMaxPrice] = useState(0);

  const {
    image,
    title,
    maxPrice,
    minPrice,
    category,
    idol,
    member,
    info,
    id,
    uid,
    likes,
    isComplete,
    endDate,
    biddingDate,
    biddingPrice,
  } = productData;

  useEffect(() => {
    const chatRef = realTimeDatabase.ref(`biddingChatRoom/${productData.id}`);
    chatRef.on('value', (snapshot) => {
      const chats = snapshot.val();
      if (chats) {
        const prices = Object.values(chats).map((chat) => chat.biddingPrice);
        setBiddingMaxPrice(Math.max(...prices));
      }
    });
  });
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ width: '300px', border: 'solid blue 1px' }}>
        <div>
          <img
            src={image}
            style={{ width: '200px', height: '200px', borderRadius: '10px' }}
          ></img>
        </div>
        <div className="CompleteButton">
          {uid === user.uid ? (
            <CompleteButton postingMode={postingMode} />
          ) : (
            <div></div>
          )}
        </div>
        <div className="productDetail">
          <p>
            경매가 {minPrice} ~ {maxPrice}
          </p>
          <p>현재 최대금액 {biddingMaxPrice}</p>
        </div>
        <div className="productInformation">{info}</div>
      </div>
    </div>
  );
};

export default ProductChatInfo;
