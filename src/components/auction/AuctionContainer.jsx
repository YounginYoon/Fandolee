import React from "react";

import styled from "styled-components";

import ProductContainer from "../common/ProductContainer";
import ProductImg from "../common/ProductImg";
import ProductOwner from "../common/ProductOwner";
import ProductTitle from "../common/ProductTitle";

const AuctionContainer = () => {
  return (
    <ProductContainer>
      <ProductImg image={"../img/mon1.jpeg"} />

      <ProductOwner owner={{}} />

      <ProductTitle title={{}} />
    </ProductContainer>
  );
};

export default AuctionContainer;

const Container = styled.div``;
