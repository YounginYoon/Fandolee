import React from "react";

import styled from "styled-components";

import { postInputWidth } from "./PostInputBox";
import { colors } from "../../common/color";

import PostInputBox from "./PostInputBox";

const PostPrice = ({ label, placeholders, names, values, onChange }) => {
  return (
    <PostInputBox label={label}>
      <Wrapper>
        <PriceInput
          placeholder={placeholders[0]}
          name={names[0]}
          values={values[0]}
          onChange={onChange}
        />
        <Text>~</Text>
        <PriceInput
          placeholder={placeholders[1]}
          name={names[1]}
          values={values[1]}
          onChange={onChange}
        />
        <Text>원</Text>
      </Wrapper>
    </PostInputBox>
  );
};

export default PostPrice;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${postInputWidth};
`;

const PriceInput = styled.input`
  display: inline-block;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  line-height: 35px;
  padding: 0 10px;
  width: calc(${postInputWidth} / 2 - 30px);
`;

const Text = styled.span`
  color: ${colors.COLOR_GRAY_TEXT};
  font-size: 14px;
`;
