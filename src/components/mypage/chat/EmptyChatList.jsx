import React from "react";
import styled from "styled-components";
import { colors } from "../../../common/color";

const EmptyChatList = ({}) => {
  return <Container>채팅 내역이 없습니다.</Container>;
};

export default EmptyChatList;

const Container = styled.div`
  margin: 50px auto;
  color: ${colors.COLOR_GRAY_TEXT};
`;
