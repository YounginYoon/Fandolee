import React from "react";

import styled from "styled-components";

import { ImageSizeTable } from "./ProductImg";

const ProductContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ProductContainer;

const Container = styled.div`
  width: ${ImageSizeTable["M"]};
  background-color: orange;
`;
