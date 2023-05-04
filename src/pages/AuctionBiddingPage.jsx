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
import Loading from '../components/common/Loading';
import useProduct from '../hooks/useProduct';

const AuctionBiddingPage = () => {
  const params = useParams();

  const id = params.id;
  const product = useProduct(id);

  if (!product) {
    return <Loading />;
  }
  return (
    <div className="productInformation">
      <ChatProductHeader productData={product} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ProductChatInfo productData={product} postingMode={'auction'} />
        <AuctionBiddingChat productData={product} />
      </div>
    </div>
  );
};

export default AuctionBiddingPage;
