import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";

const ChattingInfo = ({ product, btnText, onBtnClick, children }) => {
  const { image, info } = product;
  return (
    <Container>
      <ProductImage src={image} />

      <Btn>{btnText}</Btn>

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
  white-space: normal;
  word-wrap: break-word;
`;
