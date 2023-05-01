import { async } from '@firebase/util';
//import { push, ref } from '@firebase/database';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AuctionBiddingChat from '../components/auction/AuctionBiddingChat';
import AuctionBiddingDetail from '../components/auction/AuctionBiddingDetail';
import ChatProductHeader from '../components/common/ChatProductHeader';

const AuctionBiddingPage = () => {
  const productData = useParams();

  return (
    <div className="productInformation">
      <ChatProductHeader productData={productData} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <AuctionBiddingDetail />
        <AuctionBiddingChat productData={productData} />
      </div>
    </div>
  );
};

export default AuctionBiddingPage;
