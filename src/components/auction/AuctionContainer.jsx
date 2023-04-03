import React from "react";

import styled from "styled-components";
import { moneyFormat } from "../../common/money";

import ProductContainer from "../common/ProductContainer";
import ProductImg from "../common/ProductImg";
import ProductOwner from "../common/ProductOwner";
import ProductTitle from "../common/ProductTitle";

const AuctionContainer = ({ data }) => {
  console.log("data: ", data);
  return (
    <ProductContainer>
      <ProductImg image={data.image} />

      <ProductOwner owner={data.uid} />

      <ProductTitle title={data.title} />

      <MoneyContainer>
        <Money>{moneyFormat(data.minPrice)}</Money> 원 ~
        <Money>{moneyFormat(data.maxPrice)}</Money> 원
      </MoneyContainer>
    </ProductContainer>
  );
};

export default AuctionContainer;

const MoneyContainer = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

const Money = styled.span``;
