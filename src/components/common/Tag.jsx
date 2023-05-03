import React from "react";

import styled from "styled-components";
import { colors } from "../../common/color";

const Tag = ({
  label,
  text,
  color = colors.COLOR_LIGHTGREEN_BACKGROUND,
  textColor,
}) => {
  return (
    <TagBox>
      <TagLabel color={color}>{label}</TagLabel>
      <TagText style={textColor ? { color: textColor } : {}}>{text}</TagText>
    </TagBox>
  );
};

export default Tag;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  //   background-color: orange;
`;

const TagLabel = styled.div`
  font-size: 10px;
  color: ${colors.COLOR_DARKGRAY_TEXT};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 25px;
  background-color: ${({ color }) => color};
  border-radius: 20px;
  margin: 2.5px 15px 2.5px 0;
`;

const TagText = styled.p`
  font-size: 14px;
  color: ${colors.COLOR_DARKGRAY_TEXT};
`;
