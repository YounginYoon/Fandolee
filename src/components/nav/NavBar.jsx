import React from "react";
import styled from "styled-components";
import { colors } from "../../config/color";

const NavBar = () => {
  return (
    <NavBarDiv>
      <NavBarInner>
        <NavBtn>경매</NavBtn>
        <NavBtn>교환</NavBtn>
        <NavBtn>공지사항</NavBtn>
        <NavBtn>커뮤니티</NavBtn>
      </NavBarInner>
    </NavBarDiv>
  );
};

export default NavBar;

const NavBarDiv = styled.div`
  background-color: ${colors.COLOR_MAIN_BACKGROUND};
  width: 100%;
  border-bottom: 1px solid ${colors.COLOR_MAIN};
`;

const NavBarInner = styled.div`
  //   background-color: aqua;
  width: max-content;
  margin: 0 auto;
  display: flex;
`;

const NavBtn = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;

  &:hover {
    color: ${colors.COLOR_MAIN};
  }
`;
