import React, { useState } from "react";
import styled from "styled-components";
import Filter from "../Filter";
import TransactionBox from "./TransactionBox";

const filterList = ["낙찰", "교환"];

const TransactionList = () => {
  const [filter, setFilter] = useState(filterList[0]);

  return (
    <Container>
      <Filter filter={filter} setFilter={setFilter} filterList={filterList} />

      <Wrapper>
        <TransactionBox />
        <TransactionBox />
        <TransactionBox />
      </Wrapper>
    </Container>
  );
};

export default TransactionList;

const Container = styled.div`
  // background-color: orange;
  width: 800px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
`;
