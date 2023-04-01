import React from "react";

import styled from "styled-components";

const ProductImg = ({ image, onClick = null, size = "M" }) => {
  return (
    <Container>
      <Image src={image} onClick={onClick} size={size} />
    </Container>
  );
};

export default ProductImg;

export const ImageSizeTable = {
  S: "100px",
  M: "200px",
  L: "300px",
};

const BorderRadisSizeTable = {
  S: "5px",
  M: "10px",
  L: "15px",
};

const Container = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: ${({ size }) => ImageSizeTable[size]};
  height: ${({ size }) => ImageSizeTable[size]};
  border-radius: ${({ size }) => BorderRadisSizeTable[size]};
  object-fit: cover;
  display: inline-block;
`;
