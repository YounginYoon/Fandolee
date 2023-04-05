import React from "react";

import ProductListLayout from "../common/ProductListLayout";
import AuctionContainer from "./AuctionContainer";

const AuctionList = ({ products }) => {
  return (
    <ProductListLayout>
      {products.map((product, index) => (
        <AuctionContainer data={product} key={index} />
      ))}
    </ProductListLayout>
  );
};

export default AuctionList;
