import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../common/color';
import TransactionChat from '../components/chat/TransactionChat';
import { useParams } from 'react-router-dom';
import useProduct from '../hooks/useProduct';
import { db } from '../config/firebase';
import ChattingInfo from '../components/chat/ChattingInfo';
import Tag from '../components/common/Tag';
import Loading from '../components/common/Loading';
import useUser from '../hooks/useUser';
import { timestampToDateFormat } from '../common/date';
import { moneyFormat } from '../common/money';
import ChattingHeader from '../components/chat/ChattingHeader';

const AuctionTransactionPage = () => {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState(null);
  const [type, setType] = useState(null);

  // 낙찰자
  const [bidder, setBidder] = useState('');
  const fetchProduct = async () => {
    try {
      setType(1);
      const productDoc = await db.collection('product').doc(productId);
      productDoc.onSnapshot(async (snapshot) => {
        const data = snapshot.data();
        const findBidder = await db.collection('users').doc(data.bidder).get();
        const getBidder = findBidder.data();
        setProduct({ ...data, id: snapshot.id });
        setBidder(getBidder.nickName);
      });
    } catch (err) {
      console.log('fetchProduct err: ', err);
    }
  };

  useEffect(() => {
    //console.log(params);
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product) {
      fetchProduct();
    }
  }, [product]);

  if (!product) {
    return <Loading />;
  }

  return (
    <div>
      <ChattingHeader product={product} />
      <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
        <ChattingInfo product={product}>
          <button>거래 완료하기</button>
          <Tag label="낙찰자" text={bidder} textColor={colors.COLOR_MAIN} />
          <Tag
            label="낙찰일"
            text={timestampToDateFormat(product.biddingDate)}
            textColor={colors.COLOR_MAIN}
          />
          <Tag
            label="낙찰가"
            text={`${moneyFormat(product.biddingPrice)} 원`}
            textColor={colors.COLOR_MAIN}
          />
        </ChattingInfo>
        <div>
          {type !== null && ( // type이 null이 아닐 때 렌더링
            <TransactionChat productId={productId} type={type} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionTransactionPage;
