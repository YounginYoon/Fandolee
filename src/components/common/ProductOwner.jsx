import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";
import useOwner from "../../hooks/useOwner";
import { useNavigate } from "react-router-dom";

const ProductOwner = ({ uid }) => {
  const navigate = useNavigate();

  const [owner, profileImage] = useOwner(uid);

  const goOwnerPage = () => {
    navigate(`/user/${uid}`);
  };

  if (!owner) {
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
  // background-color: aqua;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`;

const Ninckname = styled.p`
  margin-left: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: ${colors.COLOR_DARKGRAY_TEXT};
`;
