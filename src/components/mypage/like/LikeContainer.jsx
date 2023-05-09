import React, { useState } from "react";

import styled from "styled-components";

import AuctionContainer from "../../auction/AuctionContainer";
import ProductListLayout from "../../common/ProductListLayout";
import ExchangeContainer from "../../exchange/ExchangeContainer";
import Filter from "../Filter";

const dummy = [
  {
    _id: "1",
    type: "auction",
    title: "NCT dream 앨범",
    image: "/img/mon1.jpeg",
    minPrice: 10000,
    maxPrice: 30000,
  },
  {
    _id: "2",
    type: "auction",
    title: "MonstaX 앨범",
    image: "/img/mon2.jpeg",
    minPrice: 10000,
    maxPrice: 30000,
  },
  {
    _id: "3",
    type: "exchange",
  },
  {
    _id: "4",
    type: "exchange",
  },
];

const filterList = ["전체", "경매", "교환"];

const LikeContainer = () => {
  const [filter, setFilter] = useState(filterList[0]);
  return (
    <Container>
      <Filter filter={filter} setFilter={setFilter} filterList={filterList} />
      <ProductListLayout>
        {/* {dummy.map((data, idx) =>
          data.type === "auction" ? (
            <AuctionContainer key={data._id} data={data} />
          ) : (
            <ExchangeContainer key={data._id} product={data} />
          )
        )} */}
      </ProductListLayout>
    </Container>
  );
};

export default LikeContainer;

const Container = styled.div`
  //   background-color: orange;
`;
