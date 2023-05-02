import React from "react";
import { useState, useEffect } from "react";

import { colors } from "../../common/color";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import Bamboo from "./Bamboo";

const ProductOwnerInfo = ({ uid }) => {
  const [owner, setOwner] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const getOwner = async () => {
    const docRef = doc(db, "users", uid);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("owner: ", docSnap.data());
        setOwner(docSnap.data());
      }
    } catch (err) {
      console.log("ProductOwnerInfo error: ", err);
    }
  };

  const getImage = async () => {
    try {
      const imageRef = ref(storage, `profile_image/${uid}`);
      await getDownloadURL(imageRef).then((url) => {
        // console.log("url: ", url);
        setProfileImage(url);
      });
    } catch (err) {
      console.log("get profile image err: ", err);
    }
  };

  useEffect(() => {
    getOwner();
    getImage();
  }, [uid]);

  if (!owner || !profileImage) {
    return <></>;
  }

  return (
    <Container>
      <DetailTitle>판매자 정보</DetailTitle>

      <ProfileImage src={profileImage} />

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
`;

const NickName = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin: 20px 0;
`;
