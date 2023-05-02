import React, { useState } from "react";
import { useEffect } from "react";
import { useOutlet, useParams } from "react-router-dom";

import styled from "styled-components";
import Loading from "../components/common/Loading";

import UserHeader from "../components/user/UserHeader";
import UserNav from "../components/user/UserNav";

import { taps } from "../constants/tap";
import useOwner from "../hooks/useOwner";
import useUser from "../hooks/useUser";

const UserPage = () => {
  const user = useUser();
  const params = useParams();

  const [owner, profileImage] = useOwner(params.userId);

  const [isAdmin, setIsAdmin] = useState(false);
  const [currentTab, setCurrentTab] = useState(taps.auction);

  useEffect(() => {
    if (user.uid === params.userId) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user, params]);

  if (!owner || !profileImage) {
    return <Loading />;
  }

  return (
    <Container>
      <UserHeader owner={owner} profileImage={profileImage} isAdmin={isAdmin} />

      <UserNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </Container>
  );
};

export default UserPage;

const Container = styled.div``;
