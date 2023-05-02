import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';

import { colors } from '../../common/color';
import { moneyFormat } from '../../common/money';

import GreenLine from '../common/GreenLine';
import { useState } from 'react';

const AuctionDetailInfo = ({ product }) => {
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();
  const getDataID = useParams();

  const dataID = getDataID.id;
  const {
    image,
    title,
    maxPrice,
    minPrice,
    category,
    idol,
    member,
    info,
    id,
    uid,
    likes,
    isComplete,
    endDate,
    biddingDate,
    biddingPrice,
  } = product;

  const goAuctionBiddingPage = () => {
    navigate(`/auction/auctionbidding/${dataID}`);
  };

  return (
    <Container>
      <Image src={image} />

      <SubContainer>
        <InfoDiv>
          <Title>{title}</Title>

          <Price>
            {moneyFormat(minPrice)} ~ {moneyFormat(maxPrice)} 원
          </Price>

          <GreenLine />

          <TagsDiv>
            <TagBox>
              <Tag>굿즈 종류</Tag>
              <TagText>{category}</TagText>
            </TagBox>

            {idol ? (
              <TagBox>
                <Tag>아이돌</Tag>
                <TagText>{idol}</TagText>
              </TagBox>
            ) : null}

            {member ? (
              <TagBox>
                <Tag>멤버</Tag>
                <TagText>{member}</TagText>
              </TagBox>
            ) : null}
          </TagsDiv>
        </InfoDiv>

        <BtnDiv>
          <Btn onClick={goAuctionBiddingPage}>경매 참여</Btn>
          <HeartDiv>
            <FontAwesomeIcon
              onClick={() => setIsLike(!isLike)}
              icon={isLike ? faHeart : faHeartOutline}
              style={heartStyle}
            />
            <Likes>{likes ? likes : 0}</Likes>
          </HeartDiv>
        </BtnDiv>
      </SubContainer>
    </Container>
  );
};

export default AuctionDetailInfo;

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
  obejct-fit: cover;
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
`;

const InfoDiv = styled.div``;

const Title = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
  margin-top: 10px;
`;

const Price = styled.p`
  font-weight: bold;
  font-size: 26px;
  color: ${colors.COLOR_MAIN};
  margin-bottom: 15px;
`;

const TagsDiv = styled.div`
  margin-top: 7.5px;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  font-size: 12px;
  color: ${colors.COLOR_DARKGRAY_TEXT};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 28px;
  background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  border-radius: 20px;
  margin: 2.5px 15px 2.5px 0;
`;

const TagText = styled.p``;

const BtnDiv = styled.div`
  display: flex;
  align-items: center;
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
