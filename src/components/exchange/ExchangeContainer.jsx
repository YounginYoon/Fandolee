import React from "react";
import { useNavigate } from "react-router-dom";

import ProductContainer from "../common/ProductContainer";
import ProductImg from "../common/ProductImg";
import ProductOwner from "../common/ProductOwner";
import ProductTitle from "../common/ProductTitle";
import { ImageSizeTable } from "../common/ProductImg";
import TagList from "../common/TagList";

const ExchangeContainer = ({ data }) => {

  const navigate = useNavigate();
  const goAuctionDetailPage = () => {
    navigate(`/exchange/exchangedetail/${data.id}`);
  };
  return (
    <ProductContainer>
      <ProductImg product={data}  onClick={goAuctionDetailPage}/>

      <ProductOwner uid={data.uid} />

      <ProductTitle title={data.title}/>

      <TagList width={ImageSizeTable["M"]} tags={["서울", "대면교환"]} />
    </ProductContainer>
  );
};

export default ExchangeContainer;
