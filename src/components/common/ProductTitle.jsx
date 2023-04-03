import React from "react";
import styled from "styled-components";

const ProductTitle = ({ title }) => {
  return <Title>NCT dream 버퍼링(Glitch Mode)</Title>;
};

export default ProductTitle;

const Title = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 5px;
`;
