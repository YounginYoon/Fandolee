import React from "react";
import styled from "styled-components";

const ProductOwner = ({ owner }) => {
  return (
    <Container>
      <ProfileImage src="../img/mon2.jpeg" />

      <Ninckname>닉네임</Ninckname>
    </Container>
  );
};

export default ProductOwner;

const Container = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
`;

const Ninckname = styled.p`
  margin-left: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
