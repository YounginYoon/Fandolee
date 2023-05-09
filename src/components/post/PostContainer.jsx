import React, { useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import PostImage from './PostImage';
import RecommendPrice from './RecommendPrice';

const PostContainer = ({
  children,
  recommend,
  onPost,
  images,
  setImages,
  title,
}) => {
  return (
    <Container>
      <Wrapper>
        <ImageWrapper>
          <PostImage images={images} setImages={setImages} />

          {recommend ? <RecommendPrice title={title} /> : null}
        </ImageWrapper>

        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Wrapper>

      <BtnWrapper>
        <Btn bgColor={colors.COLOR_GRAY_BACKGROUND}>취소</Btn>
        <Btn onClick={onPost} bgColor={colors.COLOR_MAIN}>
          게시
        </Btn>
      </BtnWrapper>
    </Container>
  );
};

export default PostContainer;

const Container = styled.div`
  width: max-content;
  margin: 50px auto 150px;
  // background-color: orange;
`;

const Wrapper = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div``;

const ChildrenWrapper = styled.div`
  margin-left: 50px;
`;

const BtnWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 35px;
  font-weight: bold;
  font-size: 14px;
  background-color: aqua;
  cursor: pointer;
  color: white;
  margin-left: 10px;
  border-radius: 5px;

  background-color: ${({ bgColor }) => bgColor};
`;
