import React from "react";

import styled from "styled-components";
import MyNav from "../components/mypage/MyNav";

const MyPage = () => {
  return (
    <Container>
      <MyNav />
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  background-color: aqua;
`;
