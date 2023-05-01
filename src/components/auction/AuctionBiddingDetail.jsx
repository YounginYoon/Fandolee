import React from 'react';

import styled from 'styled-components';
import { db, storage } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

import useUser from '../../hooks/useUser';
import { useState } from 'react';

const AuctionBiddingDetail = ({ productData }) => {
  const [product, setProduct] = useState('');

  const getProduct = async () => {
    const docRef = doc(db, 'product', productData.id);
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
    } catch (err) {
      console.log('AuctionBiddingDetail: ', err);
    }
  };
};

export default AuctionBiddingDetail;
