import React, { useState, useEffect } from "react";

import styled from "styled-components";

import AuctionContainer from "../../auction/AuctionContainer";
import ProductListLayout from "../../common/ProductListLayout";
import ExchangeContainer from "../../exchange/ExchangeContainer";
import Filter from "../Filter";
import useUser from "../../../hooks/useUser";
import { useLike, Like2 } from "../../../hooks/useHeart";
import { useLikeExchange } from "../../../hooks/useHeartExchange";
import useProducts from "../../../hooks/useProducts";
import useExchanges from "../../../hooks/useExchanges";
import LikeExchangeList from "./LikeExchangeList";
import LikeAuctionList from "./LikeAuctionList";
const filterList = ["경매", "교환"];

const LikeContainer = () => {
  const user = useUser();
  const [filter, setFilter] = useState(filterList[0]);

  const arrayDataAuction = useLike(user);
  const arrayDataExhange = useLikeExchange(user);

  const products = useProducts(arrayDataAuction);
  //console.log(products); //찜한 products 정보
  const exchanges = useExchanges(arrayDataExhange);
  //console.log(exchanges) //찜한 exchanges 정보

  return (
    <Container>
      <Filter filter={filter} setFilter={setFilter} filterList={filterList} />
      <ProductListLayout>
        {filter === filterList[0] ? (
          <LikeAuctionList products={products} />
        ) : filter === filterList[1] ? (
          <LikeExchangeList exchanges={exchanges} />
        ) : null}
      </ProductListLayout>
    </Container>
  );
};

export default LikeContainer;

const Container = styled.div`
  // background-color: orange;
  // width: 800px;
`;
