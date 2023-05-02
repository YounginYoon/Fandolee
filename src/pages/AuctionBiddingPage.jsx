import { async } from '@firebase/util';
//import { push, ref } from '@firebase/database';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AuctionBiddingChat from '../components/auction/AuctionBiddingChat';
import ProductChatInfo from '../components/common/ProductChatInfo';
import ChatProductHeader from '../components/common/ChatProductHeader';
import GreenLine from '../components/common/GreenLine';
import Footer from '../components/footer/Footer';

const AuctionBiddingPage = () => {
  const productData = useParams();

  return (
    <div className="productInformation">
      <ChatProductHeader productData={productData} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ProductChatInfo productData={productData} postingMode={'auction'} />
        <AuctionBiddingChat productData={productData} />
      </div>
    </div>
  );
};

export default AuctionBiddingPage;
