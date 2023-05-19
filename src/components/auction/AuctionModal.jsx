import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { useState } from 'react';
import useOwner from '../../hooks/useOwner';
import useProduct from '../../hooks/useProduct';
import Loading from '../common/Loading';

const AuctionModal = ({ product }) => {
  const navigate = useNavigate();
  const productId = product.id;
  //모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  //낙찰자
  const [owner, profileImage] = useOwner(product.bidder);

  // 채팅하기 버튼 클릭시 거래채팅으로 이동
  const goTransactionPage = () => {
    navigate(`/transaction/auction/${productId}`);
    closeModal();
  };

  // 모달 open and close
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  ////

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  if (!product) {
    return <Loading />;
  }

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      appElement={document.getElementById('root')}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        },
        content: {
          width: '200px',
          height: '250px',
          margin: 'auto',
          textAlign: 'center',
        },
      }}
    >
      <div>
        <img
          src={product.images[0]}
          style={{ width: '150px', height: '150px' }}
        />
        <div>{product.title}</div>
        <div>낙찰 금액: {product.biddingPrice}</div>
        <div>낙찰자: {owner ? owner.nickName : 'Unknown'}</div>
        <button onClick={goTransactionPage}>거래하기</button>
        <button onClick={closeModal}>닫기</button>
      </div>
    </ReactModal>
  );
};

export default AuctionModal;
