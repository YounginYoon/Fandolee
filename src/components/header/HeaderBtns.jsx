import React from "react";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";

import styled from "styled-components";
import { colors } from "../../config/color";
import useUser from "../../hooks/useUser";
import { authService } from "../../config/firebase";

const HeaderBtns = () => {
  const navigate = useNavigate();
  const user = useUser();

  const onLogout = async () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) {
      return;
    }

    try {
      const ret = await signOut(authService);
      window.sessionStorage.removeItem("user");
      window.location.reload();
    } catch (err) {
      console.log("logout error! ", err);
    }
  };

  return (
    <HeaderBtnsDiv>
      {user ? (
        <>
          <User>
            <ProfileImage src={user.photoURL} />
            <HeaderBtn>{user.displayName}</HeaderBtn>
          </User>

          <HeaderBtn
            style={{ color: colors.COLOR_GRAY_TEXT }}
            onClick={onLogout}
          >
            로그아웃
          </HeaderBtn>
        </>
      ) : (
        <>
          <HeaderBtn onClick={() => navigate("/user/login")}>로그인</HeaderBtn>
          <HeaderBtn onClick={() => navigate("/user/signup")}>
            회원가입
          </HeaderBtn>
        </>
      )}
    </HeaderBtnsDiv>
  );
};

export default HeaderBtns;

const HeaderBtnsDiv = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderBtn = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 0 10px;
  cursor: pointer;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  background-color: ${colors.COLOR_DARKGRAY_BACKGROUND};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${colors.COLOR_DARKGRAY_BACKGROUND};
  cursor: pointer;
`;
