import React from "react";
import { useNavigate } from "react-router-dom";

import ProductContainer from "../common/ProductContainer";
import ProductImg from "../common/ProductImg";
import ProductOwner from "../common/ProductOwner";
import ProductTitle from "../common/ProductTitle";
import ExchangeMember from "../common/ExchangeMember";
import { ImageSizeTable } from "../common/ProductImg";
import TagList from "../common/TagList";
import ProductLikes from "../common/ProductLikes";

const ExchangeContainer = ({ data }) => {
  const navigate = useNavigate();
  const goExchangeDetailPage = () => {
    navigate(`/exchange/exchangedetail/${data.id}`);
  };
  return (
    <ProductContainer>
      <ProductImg
        product={data}
        onClick={goExchangeDetailPage}
        auction={false}
      />

      <ProductOwner uid={data.uid} />

      <ProductTitle title={data.title} />

      <ExchangeMember memberA={data.haveMember} memberB={data.wantMember} />

      <TagList
        width={ImageSizeTable["M"]}
        tags={[data.region, data.transactionType]}
      />

      <ProductLikes likes={data.likes} />
    </ProductContainer>
  );
};

export default ExchangeContainer;
