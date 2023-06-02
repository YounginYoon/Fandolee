import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { useState } from 'react';
import useOwner from '../../hooks/useOwner';
import useProduct from '../../hooks/useProduct';
import Loading from '../common/Loading';
import { colors } from '../../common/color';
import { moneyFormat } from '../../common/money';

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
    //console.log(product);
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
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          zIndex: 9999,
        },
        content: {
          margin: 'auto',
          width: 'max-content',
          height: 'max-content',
          padding: '25px',
        },
      }}
    >
      <Container>
        <Image src={product.images[0]} />
        <Title>{product.title}</Title>
        <InfoText>낙찰이 완료되었습니다!</InfoText>

        <TextBox>
          <Label>낙찰 금액</Label>
          <Text>{moneyFormat(product.biddingPrice)} 원</Text>
        </TextBox>
        <TextBox>
          <Label>낙찰자</Label>
          <Text>{owner ? owner.nickName : '없음'}</Text>
        </TextBox>

        <BtnDiv>
          <Btn bgColor={colors.COLOR_GRAY_BACKGROUND} onClick={closeModal}>
            닫기
          </Btn>
          <Btn bgColor={colors.COLOR_MAIN} onClick={goTransactionPage}>
            거래 채팅
          </Btn>
        </BtnDiv>
      </Container>
    </ReactModal>
  );
};

export default AuctionModal;

const Container = styled.div`
  // background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 3px;
`;

const Title = styled.p`
  color: ${colors.COLOR_DARKGRAY_TEXT};
  font-weight: bold;
  margin: 15px 0 30px;
`;

const InfoText = styled.p`
  color: ${colors.COLOR_MAIN};
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 30px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  border-radius: 3px;
  padding: 5px 10px;
  width: 80%;
  box-sizing: border-box;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const Label = styled.p`
  font-size: 12px;
  color: ${colors.COLOR_GRAY_TEXT};
  text-align: center;
  width: 100px;
  margin-right: 10px;
`;

const BtnDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const Btn = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
  font-weight: bold;
  color: white;
  border-radius: 5px;
  width: 180px;
  line-height: 35px;
  text-align: center;
  margin: 0 5px;
`;
