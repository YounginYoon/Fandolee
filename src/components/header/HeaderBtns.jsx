import React from "react";
import styled from "styled-components";

const HeaderBtns = () => {
  return (
    <HeaderBtnsDiv>
      <HeaderBtn>로그인</HeaderBtn>
      <HeaderBtn>회원가입</HeaderBtn>
    </HeaderBtnsDiv>
  );
};

export default HeaderBtns;

const HeaderBtnsDiv = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderBtn = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 0 10px;
  cursor: pointer;
`;
