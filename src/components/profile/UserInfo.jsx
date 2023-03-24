import React, { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';
import { colors } from '../../config/color';

import { db, authService, storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged, reload, updateProfile } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';

const UserInfo = () => {
  const params = useParams();
  const { userId } = params;
  const userSessionStorage = useUser();

  const fileInputRef = useRef(null);
  const [imageUpload, setImageUpload] = useState('');
  const [image, setImage] = useState('');
  const [deleteImage, setDeleteImage] = useState('');
  const imageRef = ref(storage, `profile_image/${userId}`);

  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const uploadProfile = (e) => {
    setImageUpload(e.target.files?.[0]);
  };

  const handleRemoveImage = () => {
    const ok = window.confirm('프로필 사진을 삭제하시겠습니까?');
    console.log(ok);
    if (ok) {
      storage.refFromURL(imageRef).delete();
      let userGet = JSON.parse(sessionStorage.getItem('user'));
      userGet.photoURL = null;
      sessionStorage.setItem('user', JSON.stringify(userGet));
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!imageRef) return;
    if (!imageUpload) return;

    //파이어베이스 storage에 이미지 업로드
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
        authService.onAuthStateChanged((user) => {
          updateProfile(user, { photoURL: url });
          sessionStorage.setItem('user', JSON.stringify(user));
          window.location.reload();
        });
      });
    });
  }, [imageUpload]);
  //console.log(userSessionStorage.photoURL);

  return (
    <UserInfoDiv>
      <ProfileImageDiv>
        <ProfileImage src={userSessionStorage.photoURL} />
        <input
          name="inputUpload"
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          ref={fileInputRef}
          onChange={uploadProfile}
          style={{ display: 'none' }}
        />
      </ProfileImageDiv>

      <EditDiv>
        <EditBox onClick={handleClickFileInput}>Edit Profile</EditBox>
        <RemoveBox onClick={handleRemoveImage}>Remove Profile</RemoveBox>
      </EditDiv>
    </UserInfoDiv>
  );
};

export default UserInfo;

const UserInfoDiv = styled.div``;

const ProfileImageDiv = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${colors.COLOR_DARKGRAY_BACKGROUND};
  background-size: cover;
`;

const EditIcon = styled.div`
  background-color: ${colors.COLOR_GRAY_BACKGROUND};
  position: absolute;
  z-index: 10;
  bottom: 10px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
`;

const EditDiv = styled.div`
  position: relative;
`;

const EditBox = styled.div`
  cursor: pointer;
  color: ${colors.COLOR_WHITE_TEXT};
  background-color: ${colors.COLOR_GRAY_BACKGROUND};
  line-height: 40px;
  border-radius: 8px;
  text-align: center;
  margin-top: 20px;
`;

const RemoveBox = styled.div`
  cursor: pointer;
  color: ${colors.COLOR_WHITE_TEXT};
  background-color: ${colors.COLOR_REMOVE_BACKGROUND};
  line-height: 40px;
  border-radius: 8px;
  text-align: center;
  margin-top: 20px;
`;
