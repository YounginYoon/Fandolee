import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../common/color';
import TransactionChat from '../components/chat/TransactionChat';
import { useLocation, useParams } from 'react-router-dom';
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

const ExchangeTransactionPage = () => {
  const params = useParams();
  const exchangerUid = params.id;
  const productId = params.productId;
  const [product, setProduct] = useState(null);
  const [type, setType] = useState(null);
  const exchangeDoc = db.collection('exchange').doc(productId);

  //모달 띄우기
  const [showBambooModal, setShowBambooModal] = useState(false);
  const [complete, setComplete] = useState(0);

  const fetchProduct = async () => {
    try {
      setType(2);
      exchangeDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        // console.log({ ...data, id: snapshot.id });
        setProduct({ ...data, id: snapshot.id });
      });
    } catch (err) {
      console.log('fetchProduct err: ', err);
    }
  };

  const onBtnClick = async () => {
    if (!window.confirm('교환을 완료하시겠습니까?')) {
      return;
    }
    try {
      await exchangeDoc.update({ isComplete: 1 });
      await exchangeDoc.update({ exchanger: exchangerUid });
      setComplete(1);
      setType(2);
      fetchProduct();
    } catch (err) {
      console.log('onBtnClick error: ', err);
    }
  };

  useEffect(() => {
    //console.log(params.productId);
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product) {
      fetchProduct();
      if (complete) {
        setShowBambooModal(true);
      } else {
        setShowBambooModal(false);
      }
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
          btnText="교환 완료하기"
          onBtnClick={onBtnClick}
          type={2}
        >
          <Tag
            label="거래방법"
            text={product.transactionType}
            textColor={colors.COLOR_MAIN}
          />
          <Tag
            label="지역"
            text={product.region}
            textColor={colors.COLOR_MAIN}
          />
        </ChattingInfo>
        {showBambooModal && exchangerUid && <BambooModal product={product} />}
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

export default ExchangeTransactionPage;

const Wrapper = styled.div`
  //   background-color: whitesmoke;
  margin: 50px auto 300px;
  width: max-content;
  display: flex;
`;
