import React from 'react';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faGear,
  faTrash,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';

import { colors } from '../../common/color';
import { moneyFormat } from '../../common/money';

import GreenLine from '../common/GreenLine';
import { useState } from 'react';
import Tag from '../common/Tag';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { db, realTimeDatabase } from '../../config/firebase';
import UserHeartExchange from '../user/UserHeartExchange';
const ExchangeDetailInfo = ({ product }) => {
  const navigate = useNavigate();
  const user = useUser();
  const [isLike, setIsLike] = useState(false);
  const {
    images,
    title,
    category,
    idol,
    haveMember,
    wantMember,
    info,
    id,
    uid,
    likes,
    isComplete,
    region,
    transactionType,
  } = product;

  const onDelete = async () => {
    if (!window.confirm('해당 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const productDB = db.collection('exchange');
      const chatRef = realTimeDatabase.ref(`ChatRoom/Exchange/${product.id}`);
      await productDB.doc(id).delete();
      await chatRef.remove();
      navigate(-1);
    } catch (err) {
      console.log('delete product error: ', err);
    }
  };
  const onUpdate = async () => {
    navigate('./modify', { product });
  };

  const goTransactionPage = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
    } else if (uid !== user.uid) {
      createChatRoom();
      navigate(`/transaction/exchange/${product.id}/${user.uid}`);
    } else if (uid === user.uid) {
      navigate(`/transaction/exchange/${product.id}/list`);
    }
  };

  const createChatRoom = () => {
    const chatRef = realTimeDatabase.ref(
      `ChatRoom/Exchange/${id}/${user.uid}/manager`
    );
    const createChat = {
      username: user.uid,
      nickname: user.displayName,
      message: '채팅방이 생성되었습니다.',
      timestamp: 0,
    };
    chatRef.set(createChat);
  };

  return (
    <Container>
      <Image src={images[0]} />

      <SubContainer>
        {user && uid === user.uid && (
          <IconDiv>
            <Icon onClick={onUpdate}>
              <FontAwesomeIcon icon={faGear} />
            </Icon>
            <Icon onClick={onDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </Icon>
          </IconDiv>
        )}
        <InfoDiv>
          <Title>{title}</Title>

          {haveMember ? (
            <ExchangeMemberDiv>
              <ExchangeMember>
                <ExchangeText>보유 멤버</ExchangeText>
                {haveMember}
              </ExchangeMember>

              {wantMember ? (
                <>
                  <FontAwesomeIcon
                    style={{ fontSize: '20px', margin: '0 10px' }}
                    icon={faArrowRight}
                  />
                  <ExchangeMember>
                    <ExchangeText>교환 멤버</ExchangeText>
                    {wantMember}
                  </ExchangeMember>
                </>
              ) : null}
            </ExchangeMemberDiv>
          ) : null}

          <GreenLine />

          <TagsDiv>
            <Tag label="굿즈 종류" text={category} />

            {idol ? <Tag label="아이돌" text={idol} /> : null}
            {region ? (
              <Tag
                label="지역"
                text={region}
                color={colors.COLOR_GRAYTAG_BACKGROUND}
              />
            ) : null}
            {transactionType ? (
              <Tag
                label="교환방법"
                text={transactionType}
                color={colors.COLOR_GRAYTAG_BACKGROUND}
              />
            ) : null}
          </TagsDiv>
        </InfoDiv>

        <BtnDiv>
          {isComplete ? (
            <EndBtn onClick={goTransactionPage}>교환 완료</EndBtn>
          ) : (
            <Btn onClick={goTransactionPage}>교환 채팅</Btn>
          )}
          <HeartDiv>
            <UserHeartExchange product={product} />
            <Likes>{likes ? likes : 0}</Likes>
          </HeartDiv>
        </BtnDiv>
      </SubContainer>
    </Container>
  );
};

export default ExchangeDetailInfo;

const Container = styled.div`
  padding: 15px;
  border-radius: 10px;
  border: 3px solid ${colors.COLOR_MAIN};
  width: max-content;
  margin: 50px auto;
  display: flex;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 7px;
  display: inline-block;
`;

const SubContainer = styled.div`
  width: 500px;
  margin-left: 20px;
  //   background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;
const IconDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  // background-color: orange;
  font-size: 18px;
`;

const Icon = styled.div`
  margin-left: 10px;
  cursor: pointer;
  color: ${colors.COLOR_DARKGRAY_BACKGROUND};
  transition: 0.4s;

  &:hover {
    color: #333;
  }
`;

const InfoDiv = styled.div``;

const Title = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
  margin-top: 10px;
`;

const ExchangeMemberDiv = styled.div`
  font-weight: bold;
  font-size: 26px;
  color: ${colors.COLOR_MAIN};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const ExchangeMember = styled.p`
  display: flex;
  align-items: center;
`;

const ExchangeText = styled.span`
  font-size: 12px;
  color: ${colors.COLOR_DARKGRAY_TEXT};
  margin-right: 7px;
`;

const TagsDiv = styled.div`
  margin-top: 7.5px;
`;

const BtnDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Btn = styled.div`
  width: 88%;
  background-color: ${colors.COLOR_MAIN};
  line-height: 45px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  text-align: center;
  border-radius: 7px;
`;

const EndBtn = styled.div`
  width: 88%;
  background-color: ${colors.COLOR_DARKGRAY_BACKGROUND};
  line-height: 45px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  text-align: center;
  border-radius: 7px;
`;

const HeartDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  //   background-color: white;
  height: 100%;
  width: 12%;
`;

const Likes = styled.p`
  color: ${colors.COLOR_HEART};
  font-size: 12px;
`;

const heartStyle = {
  color: colors.COLOR_HEART,
  fontSize: '28px',
  cursor: 'pointer',
};
