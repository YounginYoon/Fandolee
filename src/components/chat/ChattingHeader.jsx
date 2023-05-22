import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../common/color';
import useOwner from '../../hooks/useOwner';
import Bamboo from '../common/Bamboo';
import Tag from '../common/Tag';

const ChattingHeader = ({ product }) => {
  const navigate = useNavigate();
  const { uid, title, idol, haveMember, category, info } = product;
  const [owner, profileImage] = useOwner(uid);

  if (!owner || !profileImage) {
    return <></>;
  }

  return (
    <Container>
      <Inner>
        <InfoBox>
          <Title>{title}</Title>

          <Tag
            color={colors.COLOR_GRAYTAG_BACKGROUND}
            text={category}
            label="굿즈 종류"
          />
          {idol ? (
            <Tag
              color={colors.COLOR_GRAYTAG_BACKGROUND}
              text={idol}
              label="아이돌"
            />
          ) : null}
          {haveMember ? (
            <Tag
              color={colors.COLOR_GRAYTAG_BACKGROUND}
              text={haveMember}
              label="멤버"
            />
          ) : null}
        </InfoBox>

        <OwnerBox>
          <ProfileImage
            src={profileImage}
            onClick={() => navigate(`/user/${uid}`)}
          />

          <OwnerWrapper>
            <Nickname>{owner.nickName}</Nickname>
            <Bamboo size="S" bamboo={8.5} />
          </OwnerWrapper>
        </OwnerBox>
      </Inner>
    </Container>
  );
};

export default ChattingHeader;

const Container = styled.div`
  width: 100%;
  background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  padding: 30px 0;
`;

const Inner = styled.div`
  //   background-color: orange;
  margin: 0 auto;
  height: 100%;
  //   width: 800px;
  width: max-content;
  display: flex;
  align-items: center;
`;

const InfoBox = styled.div`
  width: 450px;
  //   background-color: aqua;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 24px;
  color: ${colors.COLOR_MAIN};
  margin-bottom: 20px;
  line-height: 30px;
  height: max-content;
  width: 100%;
  white-space: normal;
  word-wrap: break-word;
`;

const OwnerBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
`;

const ProfileImage = styled.img`
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${colors.COLOR_GRAY_BORDER};
  margin-right: 15px;
  cursor: pointer;
`;

const OwnerWrapper = styled.div``;

const Nickname = styled.p`
  font-weight: bold;
`;
