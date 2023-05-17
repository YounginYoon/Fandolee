import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { moneyFormat } from "../../common/money";

import ProductContainer from "../common/ProductContainer";
import ProductImg from "../common/ProductImg";
import ProductOwner from "../common/ProductOwner";
import ProductTitle from "../common/ProductTitle";

const AuctionContainer = ({ data }) => {
  const navigate = useNavigate();
  const goAuctionDetailPage = () => {
    navigate(`/auction/auctiondetail/${data.id}`);
  };

  // console.log("AuctionContainer: ", data);

  return (
    <ProductContainer>
      <ProductImg product={data} onClick={goAuctionDetailPage} auction={true}/>

      <ProductOwner uid={data.uid} />

      <ProductTitle title={data.title} />

      <MoneyContainer>
        <Money>{moneyFormat(data.minPrice)}</Money> 원 ~
        <Money> {moneyFormat(data.maxPrice)}</Money> 원
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
