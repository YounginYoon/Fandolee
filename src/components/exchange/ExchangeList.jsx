import React from "react";

import ProductListLayout from "../common/ProductListLayout";
import ExchangeContainer from "./ExchangeContainer";

const ExchangeList = ({ products }) => {
  return (
    <ProductListLayout>
      {products.map((product, idx) => (
        <ExchangeContainer key={idx} product={product} />
      ))}
    </ProductListLayout>
  );
};

export default ExchangeList;
