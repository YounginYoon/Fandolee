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
import { db } from '../../config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const BambooModal = ({ product }) => {
  const navigate = useNavigate();
  const productId = product.id;
  //모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  //판매자
  const [owner, profileImage] = useOwner(product.uid);
  //밤부 점수 select
  const [select, setSelect] = useState(0);

  // 모달 open and close
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  ////

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const updateBamboo = async () => {
    const bambooRef = doc(db, 'bamboo', product.uid);
    const docSnap = await getDoc(bambooRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const count = data.count + 1;
      const score = data.score + parseInt(select);
      await updateDoc(bambooRef, { score: score, count: count });
    } else {
      const input = { score: parseInt(select), count: 1 };
      await setDoc(bambooRef, input);
    }
    await alert('거래가 완료되었습니다!');
    navigate('/');
    closeModal();
  };

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
        <Image src={profileImage} />
        {owner ? (
          <InfoText>{owner.nickName}님과의 거래는 어떠셨나요?</InfoText>
        ) : (
          <></>
        )}
        <Text>리뷰 남기기</Text>
        <TextBox>
          <Label>점수</Label>
          <select className="scoring" onChange={handleSelect} value={select}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
          <Text> / 10</Text>
        </TextBox>
        <Text>{select}</Text>
        <BtnDiv>
          <Btn bgColor={colors.COLOR_GRAY_BACKGROUND} onClick={closeModal}>
            닫기
          </Btn>
          <Btn bgColor={colors.COLOR_MAIN} onClick={updateBamboo}>
            거래 확정하기
          </Btn>
        </BtnDiv>
      </Container>
    </ReactModal>
  );
};

export default BambooModal;

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
