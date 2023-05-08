import React from "react";

import styled from "styled-components";
import { colors } from "../../common/color";
import ProductDetailInfo from "../common/ProductDetailInfo";
import ProductOwnerInfo from "../common/ProductOwnerInfo";

const ExchangeDetail = ({ product }) => {
  return (
    <Container>
      <ProductDetailInfo product={product} />

      <ProductOwnerInfo uid={product.uid} />
    </Container>
  );
};

export default ExchangeDetail;

const Container = styled.div`
  //   background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 300px;
`;
