import React, { useState } from "react";
import styled from "styled-components";
import Filter from "../Filter";
import TransactionBox from "./TransactionBox";
import useUser from "../../../hooks/useUser";
import useTransactions from "../../../hooks/useTransactions";

const filterList = ["낙찰", "교환"];

const TransactionList = () => {
  const user = useUser();
  const [filter, setFilter] = useState(filterList[0]);
  const transactionsArray = useTransactions(user.uid);
  
  return (
    <Container>
      <Filter filter={filter} setFilter={setFilter} filterList={filterList} />

      <Wrapper>
        {transactionsArray && transactionsArray.length > 0 && (
          transactionsArray.map((product, index) => (
            <TransactionBox transactions = {product} key = {index}/>
          ))
        )}
        
        
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
