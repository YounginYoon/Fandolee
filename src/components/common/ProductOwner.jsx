import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../common/color";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import useOwner from "../../hooks/useOwner";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const ProductOwner = ({ uid }) => {
  const navigate = useNavigate();

  const [owner, profileImage] = useOwner(uid);

  const goOwnerPage = () => {
    navigate(`/user/${uid}`);
  };

  if (!owner || !profileImage) {
    return <></>;
  }

  return (
    <Container>
      <ProfileImage src={profileImage} onClick={goOwnerPage} />

      <Ninckname>{owner.nickName}</Ninckname>
    </Container>
  );
};

export default ProductOwner;

const Container = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`;

const Ninckname = styled.p`
  margin-left: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: ${colors.COLOR_DARKGRAY_TEXT};
`;
