import React from "react";

import { ImageSizeTable } from "./ProductImg";
import styled from "styled-components";

const ProductListLayout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ProductListLayout;

const Container = styled.div`
  width: calc((${ImageSizeTable["M"]} + 20px) * 4);
  display: flex;
  flex-wrap: wrap;
  //   background-color: orange;
  margin: 50px auto 200px;
`;
