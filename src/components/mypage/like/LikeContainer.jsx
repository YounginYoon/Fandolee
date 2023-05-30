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
import useExchanges from "../../../hooks/useExchanges";
const filterList = ["전체", "경매", "교환"];

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
        {products && products.map((product,index) => 
           <AuctionContainer data={product} key={index}  />
           
        )}
        {exchanges && exchanges.map((product,index) => 
           <ExchangeContainer data={product} key={index} />
           
        )}
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
