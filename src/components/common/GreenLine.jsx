import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";

const GreenLine = () => {
  return <Line />;
};

export default GreenLine;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.COLOR_GREEN_BORDER};
`;
