import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { colors } from "../../common/color";

const HomeBanner = () => {
  const sliderParams = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 500,
    slidesToShow: 1, // 한번에 볼 수 있는 슬라이드 개수
    slidesToScroll: 1, // 한번에 넘어가는 슬라이드 개수
    arrow: true,
  };
  return (
    <StyledSlider {...sliderParams}>
      <SliderBox>
        <SliderImage src="img/mon1.jpeg" />
      </SliderBox>
      <SliderBox>
        <SliderImage src="img/mon2.jpeg" />
      </SliderBox>
      <SliderBox>
        <SliderImage src="img/mon3.jpeg" />
      </SliderBox>
    </StyledSlider>
  );
};

export default HomeBanner;

const StyledSlider = styled(Slider)`
  width: 100%;
  background-color: ${colors.COLOR_LIGHTGRAY_BACKGROUND};
`;

const SliderBox = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

const SliderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
