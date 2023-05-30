import React, { useState, useEffect } from "react";

import styled from "styled-components";

import AuctionContainer from "../../auction/AuctionContainer";
import ProductListLayout from "../../common/ProductListLayout";
import ExchangeContainer from "../../exchange/ExchangeContainer";
import Filter from "../Filter";
import useUser from "../../../hooks/useUser";
import { useLike, Like2} from "../../../hooks/useHeart";
import { useLikeExchange} from "../../../hooks/useHeartExchange";
import useProducts from "../../../hooks/useProducts";

const filterList = ["전체", "경매", "교환"];

const LikeContainer = () => {

  const user = useUser();
  let arrayDataAuction = useLike(user);
  let arrayDataExhange = useLikeExchange(user);
  console.log(arrayDataAuction);
  console.log(arrayDataExhange);
  const arrayDataAuctions = useProducts(arrayDataAuction);
  //console.log(arrayDataAuctions)
  
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
  width: 800px;
`;
