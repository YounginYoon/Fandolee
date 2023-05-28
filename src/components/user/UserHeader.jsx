import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { colors } from '../../common/color';
import Bamboo from '../common/Bamboo';
import useUser from '../../hooks/useUser';
import { useNavigate, useParams } from 'react-router-dom';
import useOwner from '../../hooks/useOwner';
import Loading from '../common/Loading';

const UserHeader = ({ owner, profileImage, isAdmin }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Inner>
        <ProfileImage src={profileImage} />

        <InfoDiv>
          <NicknameDiv>
            <Nickname>{owner.nickName}</Nickname>

            {isAdmin ? (
              <MyPageBtn
                onClick={() => navigate(`/mypage/${owner.uid}/profile`)}
              >
                <MyPage>마이 페이지</MyPage>
                <FontAwesomeIcon icon={faChevronRight} />
              </MyPageBtn>
            ) : null}
          </NicknameDiv>

          <Bamboo user={owner} />
        </InfoDiv>
      </Inner>
    </Container>
  );
};

export default UserHeader;

const Container = styled.div``;

const Inner = styled.div`
  //   background-color: orange;
  margin: 0 auto;
  width: max-content;
  display: flex;
  align-items: center;
  padding: 50px 0;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${colors.COLOR_GRAY_BORDER};
`;

const InfoDiv = styled.div`
  margin-left: 50px;
`;

const NicknameDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Nickname = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

const MyPageBtn = styled.div`
  color: ${colors.COLOR_LIGHTGRAY_TEXT};
  font-size: 12px;
  padding: 5px 10px;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 15px;
`;

const MyPage = styled.span`
  margin-right: 5px;
  font-size: 14px;
`;
