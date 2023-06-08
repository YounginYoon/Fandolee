import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutlined } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { colors } from "../../common/color";
import { remainDate } from "../../common/date";
import {
  useIsLike,
  plusProductLike,
  miusProductLike,
  useLike,
  Like2,
} from "../../hooks/useHeart";
import useUser from "../../hooks/useUser";
import Loading from "../common/Loading";
import { db } from "../../config/firebase";
import UserHeart from "../user/UserHeart";
import UserHeartExchange from "../user/UserHeartExchange";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductImg = ({ product, onClick = null, size = "M", auction }) => {
  const { endDate, isComplete } = product;

  const sliderParams = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1, // 한번에 볼 수 있는 슬라이드 개수
    slidesToScroll: 1, // 한번에 넘어가는 슬라이드 개수
    arrow: false,
  };

  return (
    <Container size={size}>
      <StyledSlider {...sliderParams}>
        {product.images.map((image) => (
          <SliderImage size={size} key={image} src={image} onClick={onClick} />
        ))}
      </StyledSlider>
      {/* <Image src={product.images[0]} onClick={onClick} /> */}

      <HeartBox>
        {auction ? (
          <UserHeart product={product} />
        ) : (
          <UserHeartExchange product={product} />
        )}
        {/* <UserHeart product={product}/> */}
      </HeartBox>

      {isComplete ? (
        <Status>{endDate ? "낙찰" : "교환"} 완료</Status>
      ) : endDate && remainDate(endDate) < 0 ? (
        <Status>경매 종료</Status>
      ) : null}
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
  S: "4px",
  M: "7px",
  L: "15px",
};

const Container = styled.div`
  position: relative;
  cursor: pointer;
  width: max-content;
  height: max-content;
  // background-color: orange;
  overflow: hidden;
  box-sizing: border-box;
  width: ${({ size }) => ImageSizeTable[size]};
  height: ${({ size }) => ImageSizeTable[size]};
  border-radius: ${({ size }) => BorderRadisSizeTable[size]};
`;

const StyledSlider = styled(Slider)`
  // width: 100%;
  // height: 100%;
  background-color: ${colors.COLOR_LIGHTGRAY_BACKGROUND};
`;

const SliderImage = styled.img`
  // width: 100%;
  // height: 100%;
  width: ${({ size }) => ImageSizeTable[size]};
  height: ${({ size }) => ImageSizeTable[size]};
  border-radius: ${({ size }) => BorderRadisSizeTable[size]};
  object-fit: cover;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
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

const Status = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
  background-color: ${colors.COLOR_GRAY_BACKGROUND};
  border-radius: 2px;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 10px;
`;
