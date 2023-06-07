import React from "react";

import { colors } from "../../common/color";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const { images, title, type } = product;

  const navigate = useNavigate();
  const onClick = () => {
    const { type, id } = product;
    const path = `/${type}/${type}detail/${id}`;
    navigate(path);
  };

  return (
    <ProductBox>
      <ProductImg src={images[0]} onClick={onClick} />

      {/* <Title>{title}</Title> */}

      <Type>{type === "auction" ? "경매" : "교환"}</Type>

      <Title>{title}</Title>
    </ProductBox>
  );
};

export default Product;

const ProductBox = styled.div`
  //   background-color: orange;
  //   width: calc(100% / 6 - 20px);
  width: 160px;
  margin: 0 10px 10px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;

const Title = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
`;

const Type = styled.p`
  //   background-color: orange;
  font-weight: bold;
  padding: 10px 0;
  color: ${colors.COLOR_MAIN};
`;
