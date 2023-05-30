import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import useUser from '../../hooks/useUser';

const ChattingInfo = ({
  product,
  btnText,
  onBtnClick,
  children,
  disabled,
  type,
}) => {
  const user = useUser();
  const { images, info, uid } = product;

  return (
    <Container>
      <ProductImage src={images[0]} />
      {/*낙찰채팅에서만 판매자한테 버튼 띄워짐*/}
      {type !== 'bidding' && user && uid !== user.uid && btnText && (
        <Btn onClick={onBtnClick} disabled={disabled}>
          {btnText}
        </Btn>
      )}

      {/* 교환, 거래채팅에선 소비자한테 거래/교환 완료 버튼 띄워짐 */}
      {type == 'bidding' && user && user.uid === uid && btnText && (
        <Btn onClick={onBtnClick} disabled={disabled}>
          {btnText}
        </Btn>
      )}

      <Tags>{children}</Tags>

      <InfoBox>
        <InfoLabel>상품 정보</InfoLabel>
        <InfoText>{info}</InfoText>
      </InfoBox>
    </Container>
  );
};

export default ChattingInfo;

const Container = styled.div`
  width: 300px;
  //   background-color: orange;
`;

const ProductImage = styled.img`
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  object-fit: contain;
  border: 2px solid ${colors.COLOR_GRAY_BORDER};
`;

const Btn = styled.div`
  box-sizing: border-box;
  width: 100%;
  line-height: 35px;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  text-align: center;
  background-color: ${colors.COLOR_BLUE_BUTTON};
  cursor: pointer;
  border: 3px solid ${colors.COLOR_BLUE_BUTTON};
  transition: 0.5s;
  margin-top: 10px;

  &:hover {
    color: ${colors.COLOR_BLUE_BUTTON};
    background-color: white;
  }
  ${(props) =>
    props.disabled &&
    `background-color: ${colors.COLOR_DARKGRAY_BACKGROUND}; 
    border-color: ${colors.COLOR_DARKGRAY_BACKGROUND};
    pointer-events: none;
    `}
`;

const Tags = styled.div`
  margin: 20px 0;
`;

const InfoBox = styled.div`
  width: 100%;
`;

const InfoLabel = styled.p`
  font-weight: bold;
  width: 100%;
  padding: 15px 0;
  margin-bottom: 15px;
  border-bottom: 1px solid ${colors.COLOR_GRAY_BORDER};
`;

const InfoText = styled.p`
  width: 100%;
  // white-space: normal;
  word-wrap: break-word;
  white-space: pre-wrap;
`;
