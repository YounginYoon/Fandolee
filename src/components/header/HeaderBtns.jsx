import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { signOut } from 'firebase/auth';

import styled from 'styled-components';
import { colors } from '../../config/color';
import useUser from '../../hooks/useUser';

import { authService, storage } from '../../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import UserInfo from '../profile/UserInfo';

const HeaderBtns = () => {
  const navigate = useNavigate();
  const user = useUser();
  const profileImageUrl = sessionStorage.getItem('profileImageUrl');
  const [url, setUrl] = useState({});

  const onLogout = async () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) {
      return;
    }

    try {
      const ret = await signOut(authService);
      window.sessionStorage.removeItem('user');
      window.sessionStorage.removeItem('profileImageUrl');
      window.location.replace('/');
    } catch (err) {
      console.log('logout error! ', err);
    }
  };

  const goProfilePage = () => {
    navigate(`/profile/${user.uid}`);
  };

  return (
    <HeaderBtnsDiv>
      {user ? (
        <>
          <User>
            {profileImageUrl ? (
              <ProfileImage src={profileImageUrl} onClick={goProfilePage} />
            ) : (
              <ProfileImage onClick={goProfilePage} />
            )}

            <HeaderBtn onClick={goProfilePage}>{user.displayName}</HeaderBtn>
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
          <HeaderBtn onClick={() => navigate('/user/login')}>로그인</HeaderBtn>
          <HeaderBtn onClick={() => navigate('/user/signup')}>
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
