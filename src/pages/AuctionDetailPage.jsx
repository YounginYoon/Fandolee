import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";
import AuctionDetailInfo from "../components/auction/AuctionDetailInfo";
import GreenLine from "../components/common/GreenLine";
import Loading from "../components/common/Loading";
import AuctionDetail from "../components/auction/AuctionDetail";
import useProduct from "../hooks/useProduct";

const AuctionDetailPage = () => {
  const params = useParams();

  const id = params.id;
  const product = useProduct(id);

  // console.log("product: ", product);

  if (!product) {
    return <Loading />;
  }

  return (
    <Container>
      <AuctionDetailInfo product={product} />

      <GreenLine />

      <AuctionDetail product={product} />
    </Container>
  );
};

export default AuctionDetailPage;

const Container = styled.div``;
