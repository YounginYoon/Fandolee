import React from "react";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Bamboo from "../../common/Bamboo";
import { colors } from "../../../common/color";
import ProfileInputs from "./ProfileInputs";

const ProfileContainer = () => {
  return (
    <Container>
      <ProfileBox>
        <ProfileImageDiv>
          <ProfileImage src="../../img/mon1.jpeg" />
          <ProfileEditBtn>
            <FontAwesomeIcon icon={faPen} />
          </ProfileEditBtn>
        </ProfileImageDiv>

        <BambooDiv>
          <BambooText>나의 밤부 레벨은?</BambooText>
          <Bamboo bamboo={9} />
        </BambooDiv>
      </ProfileBox>

      <ProfileInputs />

      <Btns>
        <Btn bgColor={colors.COLOR_GRAY_BACKGROUND}>취소</Btn>
        <Btn bgColor={colors.COLOR_MAIN}>수정</Btn>
      </Btns>
    </Container>
  );
};

export default ProfileContainer;

const Container = styled.div`
  //   background-color: orange;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImageDiv = styled.div`
  position: relative;
  margin-right: 80px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${colors.COLOR_GRAY_BACKGROUND};
`;

const ProfileEditBtn = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${colors.COLOR_GRAY_BACKGROUND};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 14px;
`;

const BambooDiv = styled.div``;

const BambooText = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  //   background-color: orange;
  justify-content: flex-end;
  margin-top: 120px;
`;

const Btn = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  margin-left: 10px;
`;
