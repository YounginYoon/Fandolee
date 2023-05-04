import React from "react";

import ProductListLayout from "../common/ProductListLayout";
import ExchangeContainer from "./ExchangeContainer";

const ExchangeList = ({ products }) => {
  //console.log("exchange list : ", products);
  return (
    <ProductListLayout>
      {products.map((product, index) => (
        <ExchangeContainer data={product} key={index} />
      ))}
    </ProductListLayout>
  );
};

export default ExchangeList;
