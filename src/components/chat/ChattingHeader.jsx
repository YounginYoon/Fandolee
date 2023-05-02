import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";
import useOwner from "../../hooks/useOwner";

const ChattingHeader = ({ product }) => {
  const { uid } = product;
  const [owner, profileImage] = useOwner(uid);

  if (!owner || !profileImage) {
    return <></>;
  }

  return <Container></Container>;
};

export default ChattingHeader;

const Container = styled.div`
  width: 100%;
  background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  height: 200px;
`;
