import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutlined } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { colors } from "../../common/color";

const ProductImg = ({
  product,
  onClick = null,
  size = "M",
  onHeartClick = () => {},
}) => {
  const [heart, setHeart] = useState(false);

  const handleHeart = () => {
    setHeart(!heart);
    onHeartClick();
  };

  return (
    <Container>
      <Image src={product.images[0]} onClick={onClick} size={size} />

      <HeartBox onClick={handleHeart}>
        <FontAwesomeIcon icon={heart ? faHeart : faHeartOutlined} />
      </HeartBox>
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
  cursor: pointer;
  width: max-content;
  height: max-content;
`;

const Image = styled.img`
  width: ${({ size }) => ImageSizeTable[size]};
  height: ${({ size }) => ImageSizeTable[size]};
  border-radius: ${({ size }) => BorderRadisSizeTable[size]};
  object-fit: cover;
  display: inline-block;
`;

const HeartBox = styled.div`
  background-color: rgba(166, 166, 166, 0.5);
  font-size: 22px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 12px;
  bottom: 15px;
  z-index: 10;
  cursor: pointer;
  color: ${colors.COLOR_HEART};
`;
