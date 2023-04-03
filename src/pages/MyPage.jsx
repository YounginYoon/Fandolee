import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

import styled from "styled-components";
import { colors } from "../common/color";
import MyNav from "../components/mypage/MyNav";
import { MyTab } from "../constants/mypage";

const MyPage = () => {
  const params = useParams();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(null);

  useEffect(() => {
    const [, , , tab] = location.pathname.split("/");
    setCurrentTab(tab);
  }, [location.pathname]);

  return (
    <Container>
      <Nav>
        <MyNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </Nav>

      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const Nav = styled.div`
  width: 15%;
  min-height: 100vh;
  //   background-color: aqua;
  padding: 50px 0;
  border-right: 1px solid ${colors.COLOR_GREEN_BORDER};
`;

const Content = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
`;
