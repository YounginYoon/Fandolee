import React from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import AuctionDetailInfo from "../components/auction/AuctionDetailInfo";
import GreenLine from "../components/common/GreenLine";
import Loading from "../components/common/Loading";
import AuctionDetail from "../components/auction/AuctionDetail";
import useExchange from "../hooks/useExchange";
import ExchangeDetailInfo from "../components/exchange/ExchangeDetailInfo";
import ExchangeDetail from "../components/exchange/ExchangeDetail";
const ExchangeDetailPage = () => {
  const params = useParams();

  const id = params.id;

  const product = useExchange(id);

  //console.log("product: ", product);

  if (!product) {
    return <Loading />;
  }

  return (
    <Container>
      <ExchangeDetailInfo product={product} />

      <GreenLine />

      <ExchangeDetail product={product} />
    </Container>
  );
};

export default ExchangeDetailPage;

const Container = styled.div``;
