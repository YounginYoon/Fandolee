import React, { useState, useEffect } from "react";

import styled from "styled-components";
import useUser from "../../../hooks/useUser";
import Filter from "../Filter";
import AuctionChattingList from "./AuctionChattingList";
import ExchangeChattingList from "./ExchangeChattingList";
import TransactionChattingList from "./TransactionChattingList";

const filterList = ["경매", "교환", "낙찰"];

const ChattingList = () => {
  const [filter, setFilter] = useState(filterList[0]);
  const user = useUser();

  return (
    <Container>
      <Filter filter={filter} setFilter={setFilter} filterList={filterList} />

      <ChattingWrapper>
        {filter === filterList[0] ? (
          <AuctionChattingList user={user} />
        ) : filter === filterList[1] ? (
          <ExchangeChattingList user={user} />
        ) : filter === filterList[2] ? (
          <TransactionChattingList user={user} />
        ) : null}
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
