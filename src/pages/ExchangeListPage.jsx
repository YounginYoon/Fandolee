import React from "react";
import styled from "styled-components";
import ExchangeList from "../components/exchange/ExchangeList";
import ExchangeSearchBar from "../components/exchange/ExchangeSearchBar";

const ExchangeListPage = () => {
  return (
    <Container>
      <ExchangeSearchBar />

      <ExchangeList products={[1, 2, 3, 4, 5, 6]} />
    </Container>
  );
};

export default ExchangeListPage;

const Container = styled.div``;
