import React from "react";

import styled from "styled-components";

import ProductContainer from "../common/ProductContainer";
import ProductImg from "../common/ProductImg";
import ProductOwner from "../common/ProductOwner";
import ProductTitle from "../common/ProductTitle";

const AuctionContainer = ({data}) => {
  return (
    <ProductContainer>
      <ProductImg image={data.image} />

      <ProductOwner owner={data.uid} />

      <ProductTitle title={data.title} />
    </ProductContainer>
  );
};

export default AuctionContainer;

const Container = styled.div``;
