import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";

const RecommendedProducts = () => {
  return (
    <Container>
      <Text>팬도리를 위한 추천상품 🎁</Text>

      <ProductsDiv>
        <ProductBox>
          <ProductImg src="/img/goods1.jpeg" />

          {/* <OwnerDiv>
            <OwnerProfileImg />
            <OwnerName>닉네임</OwnerName>
          </OwnerDiv>

          <ProductTitle>간지나는 응원봉</ProductTitle> */}
        </ProductBox>

        <ProductBox>
          <ProductImg src="/img/goods2.jpeg" />
        </ProductBox>

        <ProductBox>
          <ProductImg src="/img/goods3.jpeg" />
        </ProductBox>

        <ProductBox>
          <ProductImg src="/img/goods4.jpeg" />
        </ProductBox>

        <ProductBox>
          <ProductImg src="/img/goods5.jpeg" />
        </ProductBox>

        <ProductBox>
          <ProductImg src="/img/goods6.jpeg" />
        </ProductBox>
      </ProductsDiv>
    </Container>
  );
};

export default RecommendedProducts;

const Container = styled.div`
  //   background-color: orange;
  margin-top: 50px;
  padding: 0 100px;
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: ${colors.COLOR_MAIN};
`;

const ProductsDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 30px auto 200px;
`;

const ProductBox = styled.div`
  //   background-color: orange;
  width: calc(100% / 6 - 20px);
  margin: 0 10px;
`;

const ProductImg = styled.img`
  //   width: 200px;
  //   height: 250px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;

const OwnerDiv = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 10px;
`;

const OwnerProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${colors.COLOR_DARKGRAY_BACKGROUND};
  margin-right: 10px;
`;

const OwnerName = styled.span`
  font-size: 16px;
  color: ${colors.COLOR_GRAY_TEXT};
  flex-shirink: 1;
`;

const ProductTitle = styled.p`
  font-weight: bold;
`;
