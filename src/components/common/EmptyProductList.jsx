import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";

const EmptyProductList = () => {
  return <Container>관련 상품이 없습니다.</Container>;
};

export default EmptyProductList;

const Container = styled.div`
  margin: 100px auto;
  color: ${colors.COLOR_DARKGRAY_TEXT};
  text-align: center;
  //   background-color: orange;
`;
