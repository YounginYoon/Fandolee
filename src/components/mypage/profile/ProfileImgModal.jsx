import React, { useRef, useState } from "react";

import styled from "styled-components";
import { colors } from "../../../common/color";

import useUser from "../../../hooks/useUser";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, authService, storage } from "../../../config/firebase";
import { updateProfile } from "firebase/auth";

const ProfileImgModal = ({ setOpenModal }) => {
  const user = useUser();

  const fileInputRef = useRef(null);

  const [image, setImage] = useState("");
  const [imageSrc, setImageSrc] = useState(user.photoURL);

  const imageRef = ref(storage, `profile_image/${user.uid}`);

  const onContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpenModal(false);
    }
  };

  // 프로필 사진 삭제 함수
  const handleRemoveImage = () => {
    const ret = window.confirm("프로필 사진을 삭제하시겠습니까?");
    if (ret) {
      // 프로필 사진 삭제
      authService.onAuthStateChanged((user) => {
        if (user) {
          storage.refFromURL(imageRef).delete();
          updateProfile(user, { photoURL: "" });
          window.location.reload();
        }
      });
    }
  };

  // 프로필 사진 업로드 함수
  const handleUploadImage = () => {
    if (!imageRef) return;
    if (!image) return;

    // 파이어베이스 storage 에 이미지 업로드
    authService.onAuthStateChanged((user) => {
      if (user) {
        uploadBytes(imageRef, image).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            updateProfile(user, { photoURL: url });
            window.location.reload();
          });
        });
      }
    });
  };

  // 이미지 소스 변경
  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
        setImage(file);
        resolve();
      };
    });
  };

  return (
    <Container onClick={onContainerClick}>
      <Modal>
        <ModalHeader>프로필 이미지 수정</ModalHeader>

        <ProfileImage src={imageSrc} />

        <ProfileUploadBtn onClick={() => fileInputRef.current?.click()}>
          이미지 선택
        </ProfileUploadBtn>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onUpload}
        />

        <ProfileDeleteBtn onClick={handleRemoveImage}>
          기본 이미지로 변경
        </ProfileDeleteBtn>

        <Btns>
          <Btn
            bgColor={colors.COLOR_GRAY_BACKGROUND}
            onClick={() => setOpenModal(false)}
          >
            취소
          </Btn>
          <Btn bgColor={colors.COLOR_MAIN} onClick={handleUploadImage}>
            수정
          </Btn>
        </Btns>
      </Modal>
    </Container>
  );
};

export default ProfileImgModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 600px;
  //   height: 600px;
  border-radius: 10px;
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: ${colors.COLOR_GRAY_TEXT};
  width: 100%;
  height: 40px;
  background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid ${colors.COLOR_GRAY_BORDER};
  object-fit: cover;
  margin: 30px 0;
`;

const ProfileUploadBtn = styled.div`
  cursor: pointer;
  padding: 5px 15px;
  background-color: ${colors.COLOR_GRAY_BACKGROUND};
  border-radius: 3px;
  font-size: 14px;
`;
const ProfileDeleteBtn = styled.p`
  color: ${colors.COLOR_BLUE_TEXT};
  font-size: 13px;
  margin-top: 15px;
  cursor: pointer;
`;

const Btns = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 100px;
  margin-bottom: 30px;
  width: calc(100% - 60px);
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-weight: bold;
  color: white;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
  width: calc(50% - 15px);
`;
