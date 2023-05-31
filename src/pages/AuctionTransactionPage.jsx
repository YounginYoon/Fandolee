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
import BambooModal from '../components/common/BambooModal';

const AuctionTransactionPage = () => {
  const params = useParams();
  const user = useUser();
  const productId = params.id;
  const [product, setProduct] = useState(null);
  const [type, setType] = useState(null);

  // 낙찰자
  const [bidder, setBidder] = useState('');
  const productDoc = db.collection('product').doc(productId);
  //모달 띄우기
  const [showBambooModal, setShowBambooModal] = useState(false);

  const fetchProduct = async () => {
    try {
      setType(1);
      productDoc.onSnapshot(async (snapshot) => {
        const data = snapshot.data();
        const findBidder = await db.collection('users').doc(data.bidder).get();
        const getBidder = findBidder.data();
        setProduct({ ...data, id: snapshot.id });
        setBidder(getBidder.nickName);
        checkComplete();
      });
    } catch (err) {
      console.log('fetchProduct err: ', err);
    }
  };

  const checkComplete = () => {
    if (product && product.completeTransaction === 1 && !product.bambooScore) {
      if (product.bidder == user.uid) setShowBambooModal(true);
      else setShowBambooModal(false);
    }
  };

  const completeTransaction = async () => {
    if (!window.confirm('거래를 확정하시겠습니까?')) {
      return;
    }
    try {
      await productDoc.update({ completeTransaction: 1 });
      fetchProduct();
    } catch (err) {
      console.log('completeTransaction err: ', err);
    }
  };

  useEffect(() => {
    //console.log(params);
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product) {
      fetchProduct();
      checkComplete();
    }
  }, [product]);

  if (!product) {
    return <Loading />;
  }

  return (
    <>
      <ChattingHeader product={product} />

      <Wrapper>
        <ChattingInfo
          product={product}
          btnText={'거래 완료하기'}
          onBtnClick={completeTransaction}
          disabled={product.completeTransaction}
        >
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
        {showBambooModal && product.bidder === user.uid && (
          <BambooModal product={product} type={'auction'} />
        )}

        <div>
          {type !== null && ( // type이 null이 아닐 때 렌더링
            <TransactionChat
              productId={productId}
              type={type}
              product={product}
            />
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default AuctionTransactionPage;

const Wrapper = styled.div`
  margin: 50px auto 300px;
  width: max-content;
  display: flex;
`;
