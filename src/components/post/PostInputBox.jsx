import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";

export const postInputWidth = "370px";

const PostInputBox = ({ label, children }) => {
  return (
    <Container>
      <Label>{label}</Label>

      {children}
    </Container>
  );
};

export default PostInputBox;

const Container = styled.div`
  //   background-color: aqua;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Label = styled.p`
  color: ${colors.COLOR_MAIN};
  font-weight: bold;
  text-align: center;
  width: 160px;
`;
