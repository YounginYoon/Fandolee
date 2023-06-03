import React, { useState } from "react";
import styled from "styled-components";
import Filter from "../Filter";
import TransactionBox from "./TransactionBox";
import ExTransactionBox from "./ExTransactionBox";
import useUser from "../../../hooks/useUser";
import useTransactions from "../../../hooks/useTransactions";
import EmptyList from "../EmptyList";

const filterList = ["낙찰", "교환"];

const ExchangeTransactions = ({ transactions }) => {
  if (!transactions) {
    return <></>;
  }
  return transactions && transactions.length == 0 ? (
    <EmptyList text="거래 내역이 없습니다." />
  ) : (
    transactions.map((transaction, idx) => (
      <ExTransactionBox key={transaction.id} transaction={transaction} />
    ))
  );
};

const AuctionTransactions = ({ transactions }) => {
  if (!transactions) {
    return <></>;
  }

  return transactions && transactions.length == 0 ? (
    <EmptyList text="거래 내역이 없습니다." />
  ) : (
    transactions.map((transaction, idx) => (
      <TransactionBox key={transaction.id} transaction={transaction} />
    ))
  );
};

const TransactionList = () => {
  const user = useUser();
  const [filter, setFilter] = useState(filterList[0]);
  const transactionsArray = useTransactions(user.uid, "auction");
  const exTrandsactionsArray = useTransactions(user.uid, "exchange");

  //console.log({ transactionsArray, exTrandsactionsArray });
  return (
    <Container>
      <Filter filter={filter} setFilter={setFilter} filterList={filterList} />

      <Wrapper>
        {filter === filterList[0] ? (
          <AuctionTransactions transactions={transactionsArray} />
        ) : filter === filterList[1] ? (
          <ExchangeTransactions transactions={exTrandsactionsArray} />
        ) : null}
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
