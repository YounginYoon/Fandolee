import React from "react";

import styled, { css } from "styled-components";
import { colors } from "../../common/color";
import { taps } from "../../constants/tap";

const UserNav = ({ currentTab, setCurrentTab }) => {
  const onClick = (tab) => {
    setCurrentTab(tab);
  };
  return (
    <Container>
      <Tabs>
        <Tab
          onClick={() => onClick(taps.auction)}
          isClicked={currentTab === taps.auction}
        >
          {taps.auction}
        </Tab>
        <Tab
          onClick={() => onClick(taps.exchange)}
          isClicked={currentTab === taps.exchange}
        >
          {taps.exchange}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserNav;

const Container = styled.div`
  border-bottom: 1px solid ${colors.COLOR_GREEN_BORDER};
`;

const Tabs = styled.div`
  margin: 0 auto;
  width: max-content;
  //   background-color: orange;
  display: flex;
  align-items: center;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  font-weight: bold;
  border-bottom: 5px solid white;
  cursor: pointer;

  ${({ isClicked }) => {
    if (isClicked) {
      return css`
        color: ${colors.COLOR_MAIN};
        border-color: ${colors.COLOR_MAIN};
      `;
    } else {
      return css`
        color: ${colors.COLOR_GRAY_TEXT};
        border-color: white;
      `;
    }
  }}
`;
