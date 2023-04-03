import React from "react";

import styled, { css } from "styled-components";
import { MyTab } from "../../constants/mypage";
import { colors } from "../../common/color";
import { useNavigate } from "react-router-dom";

const MyNav = ({ currentTab, setCurrentTab }) => {
  const navigate = useNavigate();

  const onClick = (tab) => {
    setCurrentTab(tab);
    navigate(tab);
  };
  return (
    <Container>
      {MyTab.map((data, idx) => (
        <Tab
          key={idx}
          isClicked={data.tab === currentTab}
          onClick={() => onClick(data.tab)}
        >
          {data.text}
        </Tab>
      ))}
    </Container>
  );
};

export default MyNav;

const Container = styled.div``;

const Tab = styled.p`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  ${({ isClicked }) => {
    if (isClicked) {
      return css`
        color: ${colors.COLOR_MAIN};
        font-weight: 900;
      `;
    } else {
      return css`
        color: ${colors.COLOR_GRAY_TEXT};
        font-weight: 400;
      `;
    }
  }}
`;
