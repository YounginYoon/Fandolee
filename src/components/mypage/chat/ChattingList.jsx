import React, { useState } from "react";
import styled from "styled-components";
import Filter from "../Filter";
import AuctionChattingBox from "./AuctionChattingBox";
import ChattingBox from "./ChattingBox";
import ExchangeChattingBox from "./ExchangeChattingBox";

const filterList = ["전체", "경매", "낙찰", "교환"];

const ChattingList = () => {
  const [filter, setFilter] = useState(filterList[0]);

  return (
    <Container>
      <Filter filter={filter} setFilter={setFilter} filterList={filterList} />

      <ChattingWrapper>
        <AuctionChattingBox />
        <AuctionChattingBox />
        <ExchangeChattingBox />
      </ChattingWrapper>
    </Container>
  );
};

export default ChattingList;

const Container = styled.div`
  //   background-color: orange;
  width: 800px;
`;

const ChattingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`;
