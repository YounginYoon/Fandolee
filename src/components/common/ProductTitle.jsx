import React from "react";
import styled from "styled-components";

const ProductTitle = ({ title, fontWeight = "400" }) => {
  return <Title fontWeight={fontWeight}>{title}</Title>;
};

export default ProductTitle;

const Title = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
  font-weight: ${({ fontWeight }) => fontWeight};
  // background-color: orange;
  // padding: 5px 0;
`;
