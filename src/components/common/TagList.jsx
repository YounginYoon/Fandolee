import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";

const TagList = ({ width, tags }) => {
  return (
    <Container width={width}>
      {tags.map((tag, idx) => (
        <Tag key={`${tag}_${idx}`}>{tag}</Tag>
      ))}
    </Container>
  );
};

export default TagList;

const Container = styled.div`
  width: ${({ width }) => width};
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.COLOR_GRAY_TAG};
  color: ${colors.COLOR_GRAY_TEXT};
  padding: 5px 15px;
  font-size: 12px;
  border-radius: 20px;
  margin-right: 5px;
`;
