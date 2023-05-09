import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../../common/color";

import ChattingBox from "./ChattingBox";
import { db, realTimeDatabase } from "../../../config/firebase";

import useUser from "../../../hooks/useUser";
import { useEffect } from "react";
import useProduct from "../../../hooks/useProduct";
import { useNavigate } from "react-router-dom";

const AuctionChattingBox = ({ id }) => {
  const product = useProduct(id);

  // console.log("AuctionChattingBox product: ", product);

  const navigate = useNavigate();
  const goAuctionChat = () => {
    navigate(`/auction/${id}/chat`);
  };

  if (!product) {
    return <></>;
  }

  return (
    <ChattingBox
      uid={product.uid}
      title={product.title}
      onClick={goAuctionChat}
    >
      <Status>{product.isComplete === 0 ? "경매 진행 중" : "경매 종료"}</Status>
    </ChattingBox>
  );
};

export default AuctionChattingBox;

const Status = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: ${colors.COLOR_MAIN};
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
