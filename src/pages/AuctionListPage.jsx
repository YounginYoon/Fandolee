import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuctionContainer from "../components/auction/AuctionContainer";
import { colors } from "../common/color";

import { db, authService, storage } from "../config/firebase";

const AuctionListPage = () => {
  const navigate = useNavigate();
  const goAuctionUpPage = () => {
    navigate(`/auction/auctionUp`);
  };
  return (
    <>
      <button onClick={goAuctionUpPage}>글올리기</button>

      <AuctionContainer />
    </>
  );
};

export default AuctionListPage;
