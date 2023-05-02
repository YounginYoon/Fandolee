import React from "react";

import { colors } from "../../common/color";
import styled from "styled-components";

import Tag from "./Tag";

const ProductDetailInfo = ({ product }) => {
  const { image, category, idol, member, info, region, transactionType } =
    product;
  return (
    <Container>
      <DetailTitle>상품 정보</DetailTitle>

      <ProductImage src={image} />

      <Tag label="굿즈 종류" text={category} />

      {idol ? <Tag label="아이돌" text={idol} /> : null}

      {member ? <Tag label="멤버" text={member} /> : null}

      {region ? (
        <Tag
          label="지역"
          text={region}
          color={colors.COLOR_GRAYTAG_BACKGROUND}
        />
      ) : null}

      {transactionType ? (
        <Tag
          label="거래방법"
          text={transactionType}
          color={colors.COLOR_GRAYTAG_BACKGROUND}
        />
      ) : null}

      <DetailInfo>{info} </DetailInfo>
    </Container>
  );
};

export default ProductDetailInfo;

const Container = styled.div`
  margin: 100px 0;
  //   width: max-content;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //   background-color: orange;
`;

const DetailTitle = styled.p`
  font-weight: bold;
  font-size: 22px;
  color: ${colors.COLOR_MAIN};
  margin-bottom: 60px;
`;

const DetailInfo = styled.p`
  margin-top: 40px;
  line-height: 32px;
  text-align: center;
`;

const ProductImage = styled.img`
  display: inline-block;
  width: 100%;
  object-fit: contain;
  margin-bottom: 40px;
`;
