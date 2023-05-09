import React from 'react';

import PostInputBox, { postInputWidth } from './PostInputBox';
import styled from 'styled-components';
import { colors } from '../../common/color';

const PostInputText = ({ onChange, value, label, name, placeholder }) => {
  return (
    <PostInputBox label={label}>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </PostInputBox>
  );
};

export default PostInputText;

const Input = styled.input`
  display: inline-box;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  padding: 0 10px;
  line-height: 35px;
  width: ${postInputWidth};
`;
