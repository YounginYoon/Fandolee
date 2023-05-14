import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "../../common/color";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState("");

  const goAuctionListPage = () => {
    navigate(`/auction/list`);
  };
  const goExchangeListPage = () => {
    navigate("/exchange/list");
  };

  useEffect(() => {
    const [, tmp] = location.pathname.split("/");
    setCurrentTab(tmp);
  }, [location.pathname]);

  return (
    <NavBarDiv>
      <NavBarInner>
        <NavBtn isActive={currentTab === "auction"} onClick={goAuctionListPage}>
          경매
        </NavBtn>
        <NavBtn
          isActive={currentTab === "exchange"}
          onClick={goExchangeListPage}
        >
          교환
        </NavBtn>
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
  transition: 0.3s;

  ${({ isActive }) => {
    if (isActive) {
      return css`
        font-weight: bold;
        color: ${colors.COLOR_MAIN};
      `;
    } else {
      return css`
        font-weight: 600;
      `;
    }
  }}

  &:hover {
    color: ${colors.COLOR_MAIN};
  }
`;
