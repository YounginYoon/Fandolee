import React from "react";

import styled from "styled-components";
import { colors } from "../../config/color";

import HeaderBtns from "./HeaderBtns";
import HeaderInput from "./HeaderInput";

const Header = () => {
  return (
    <HeaderDiv>
      <HeaderInner>
        <HeaderLeft>
          <HeaderTitle
            onClick={() => {
              window.location.replace("/");
            }}
          >
            팬도리
          </HeaderTitle>

          <HeaderInput />
        </HeaderLeft>

        <HeaderBtns />
      </HeaderInner>
    </HeaderDiv>
  );
};

export default Header;

const HeaderDiv = styled.div`
  width: 100%;
  height: 70px;
`;

const HeaderInner = styled.div`
  width: 70%;
  min-width: 800px;
  height: 100%;
  margin: 0 auto;
  //   background-color: aqua;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.COLOR_MAIN};
  cursor: pointer;
`;
