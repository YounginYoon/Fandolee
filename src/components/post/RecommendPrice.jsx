import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";
import { moneyFormat } from "../../common/money";

const RecommendPrice = () => {
  return (
    <Container>
      <RecommendBox>
        <FandolBox>
          <FandolImg src="../img/fandol.png" />
          <FandolText>팬봇 추천</FandolText>
        </FandolBox>

        <TextBox>
          <Text>최소</Text>
          <Price>{moneyFormat(10000)}</Price>
        </TextBox>
        <TextBox>
          <Text>최대</Text>
          <Price>{moneyFormat(30000)}</Price>
        </TextBox>
      </RecommendBox>

      <RecommendBtn>가격 추천 받기</RecommendBtn>
    </Container>
  );
};

export default RecommendPrice;

const Container = styled.div`
  margin-top: 40px;
`;

const RecommendBox = styled.div`
  border-radius: 15px;
  border: 3px solid ${colors.COLOR_MAIN};
  position: relative;
  padding: 20px 0 15px;
`;

const FandolBox = styled.div`
  background-color: white;
  position: absolute;
  top: -25px;
  left: 35px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 25px 0 10px;
`;

const FandolImg = styled.img`
  height: 100%;
  object-fit: contain;
`;

const FandolText = styled.p`
  color: ${colors.COLOR_MAIN};
  font-size: 20px;
  font-weight: bold;
  margin-left: 5px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
`;

const Text = styled.span`
  color: ${colors.COLOR_MAIN};
  font-size: 14px;
  font-weight: bold;
  margin-right: 20px;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const RecommendBtn = styled.div`
  border-radius: 8px;
  background-color: ${colors.COLOR_MAIN};
  height: 50px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  cursor: pointer;
`;
