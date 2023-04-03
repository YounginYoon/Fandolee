import React, { useState } from "react";

import styled from "styled-components";

import UserHeader from "../components/user/UserHeader";
import UserNav from "../components/user/UserNav";

import { taps } from "../constants/tap";

const UserPage = () => {
  const [currentTab, setCurrentTab] = useState(taps.auction);

  return (
    <Container>
      <UserHeader />

      <UserNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </Container>
  );
};

export default UserPage;

const Container = styled.div``;
