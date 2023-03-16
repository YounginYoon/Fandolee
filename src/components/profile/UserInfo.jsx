import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import { colors } from "../../config/color";

const UserInfo = ({ profileImage }) => {
  return (
    <UserInfoDiv>
      <ProfileImageDiv>
        <ProfileImage />

        {/* <EditIcon>
          <FontAwesomeIcon icon={faPen} />
        </EditIcon> */}
      </ProfileImageDiv>

      <EditBox>Edit Profile</EditBox>
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

const EditBox = styled.div`
  cursor: pointer;
  color: ${colors.COLOR_WHITE_TEXT};
  background-color: ${colors.COLOR_GRAY_BACKGROUND};
  line-height: 40px;
  border-radius: 8px;
  text-align: center;
  margin-top: 20px;
`;
