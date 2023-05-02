import React from "react";
import { useState, useEffect } from "react";

import { colors } from "../../common/color";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import Bamboo from "./Bamboo";
import useOwner from "../../hooks/useOwner";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const ProductOwnerInfo = ({ uid }) => {
  const navigate = useNavigate();
  const [owner, profileImage] = useOwner(uid);

  const goOwnerPage = () => {
    navigate(`/user/${uid}`);
  };

  if (!owner || !profileImage) {
    return <Loading />;
  }

  return (
    <Container>
      <DetailTitle>판매자 정보</DetailTitle>

      <ProfileImage onClick={goOwnerPage} src={profileImage} />

      <NickName>{owner.nickName}</NickName>

      <Bamboo bamboo={8.5} />
    </Container>
  );
};

export default ProductOwnerInfo;

const Container = styled.div`
  margin: 100px 0;
  //   width: max-content;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //   background-color: orange;
`;

const DetailTitle = styled.p`
  font-weight: bold;
  font-size: 22px;
  color: ${colors.COLOR_MAIN};
  margin-bottom: 60px;
`;

const ProfileImage = styled.img`
  display: inline-block;
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid ${colors.COLOR_GRAY_BORDER};
`;

const NickName = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin: 20px 0;
`;
