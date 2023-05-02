import React from "react";

import ProductContainer from "../common/ProductContainer";
import ProductImg from "../common/ProductImg";
import ProductOwner from "../common/ProductOwner";
import ProductTitle from "../common/ProductTitle";
import { ImageSizeTable } from "../common/ProductImg";
import TagList from "../common/TagList";

const ExchangeContainer = ({ product }) => {
  return (
    <ProductContainer>
      <ProductImg product={{ image: "../../img/mon2.jpeg" }} />

      {/* <ProductOwner /> */}

      <ProductTitle title={"title"} fontWeight={"bold"} />

      <TagList width={ImageSizeTable["M"]} tags={["서울", "대면교환"]} />
    </ProductContainer>
  );
};

export default ExchangeContainer;
