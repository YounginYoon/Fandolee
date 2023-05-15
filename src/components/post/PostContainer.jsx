import React, { useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../common/color";
import PostImage from "./PostImage";
import RecommendPrice from "./RecommendPrice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { db } from "../../config/firebase";

const PostContainer = ({
  children,
  recommend,
  onPost,
  images,
  setImages,
  title,
  category,
}) => {
  const navigate = useNavigate();

  const onCanceled = () => {
    if (recommend) {
      navigate("/auction/list");
    } else {
      navigate("/exchange/list");
    }
  };

  return (
    <>
      <Header>
        <HeaderText>
          {recommend ? "경매" : "교환"} 게시글 업로드
          <FontAwesomeIcon icon={faPen} style={{ marginLeft: "10px" }} />
        </HeaderText>
      </Header>
      <Container>
        <Wrapper>
          <ImageWrapper>
            <PostImage images={images} setImages={setImages} />
            {recommend ? (
              <RecommendPrice title={title} category={category} />
            ) : null}
          </ImageWrapper>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </Wrapper>

        <BtnWrapper>
          <Btn onClick={onCanceled} bgColor={colors.COLOR_GRAY_BACKGROUND}>
            취소
          </Btn>
          <Btn onClick={onPost} bgColor={colors.COLOR_MAIN}>
            게시
          </Btn>
        </BtnWrapper>
      </Container>
    </>
  );
};

export default PostContainer;

const Header = styled.div`
  width: 900px;
  margin: 20px auto 0;
  border-bottom: 1px solid ${colors.COLOR_GRAY_BORDER};
`;

const HeaderText = styled.p`
  width: max-content;
  font-size: 24px;
  font-weight: bold;
  color: ${colors.COLOR_MAIN};
  padding: 15px;
`;

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
