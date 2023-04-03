import React from "react";
import styled from "styled-components";

const ProductTitle = ({ title }) => {
  return <Title>{title}</Title>;
};

export default ProductTitle;

const Title = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 5px;
`;
