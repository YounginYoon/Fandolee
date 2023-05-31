import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";

const EmptyList = ({ text }) => {
  return <Container>{text}</Container>;
};

export default EmptyList;

const Container = styled.div`
  margin: 50px auto;
  color: ${colors.COLOR_GRAY_TEXT};
`;
