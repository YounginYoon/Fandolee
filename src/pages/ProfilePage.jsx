import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Bamboo from "../components/profile/Bamboo";
import TransactionHistory from "../components/profile/TransactionHistory";
import UserInfo from "../components/profile/UserInfo";
import { db } from "../config/firebase";

const ProfilePage = () => {
  const params = useParams();
  const { uid } = params;

  const [profile, setProfile] = useState({});

  const getUserData = async () => {
    try {
      const users = db.collection("users");
      const ret = await users.doc(uid).get();

      console.log(ret.data());
      setProfile(ret.data());
    } catch (err) {
      console.log("get profile data error! ", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, [uid]);

  return (
    <ProfileDiv>
      <UserInfo profileImage={profile.프로필} />

      <InfoDiv>
        <Bamboo nickname={profile.nickName} bamboo={8.5} />

        <TransactionHistory />
      </InfoDiv>
    </ProfileDiv>
  );
};

export default ProfilePage;

const ProfileDiv = styled.div`
  //   background-color: orange;
  margin: 100px auto;
  width: max-content;
  display: flex;
`;

const InfoDiv = styled.div`
  margin-left: 100px;
`;
