import React from "react";
import styled from "styled-components";
import { ImageSizeTable } from "../common/ProductImg";
import AuctionContainer from "./AuctionContainer";

const AuctionList = ({ products }) => {
  return (
    <Container>
      {products.map((product, index) => (
        <AuctionContainer data={product} key={index} />
      ))}
    </Container>
  );
};

export default AuctionList;

const Container = styled.div`
  width: calc((${ImageSizeTable["M"]} + 20px) * 4);
  display: flex;
  flex-wrap: wrap;
  //   background-color: orange;
  margin: 50px auto 200px;
`;
