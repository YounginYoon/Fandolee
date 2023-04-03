import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../../common/color";

const ProfileInputs = () => {
  const [inputs, setInputs] = useState({
    email: "",
    userName: "",
    nickName: "",
  });
  return (
    <Container>
      <InputBox>
        <Label>이메일</Label>
        <Input disabled />
      </InputBox>

      <InputBox>
        <Label>이름</Label>
        <Input disabled />
      </InputBox>

      <InputBox>
        <Label>닉네임</Label>
        <SmallInput />

        <DupBtn>중복검사</DupBtn>
      </InputBox>
    </Container>
  );
};

export default ProfileInputs;

const Container = styled.div`
  //   background-color: aqua;
  margin-top: 50px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 700px;
`;

const Label = styled.p`
  //   background-color: orange;
  width: 150px;
  text-align: center;
`;

const Input = styled.input`
box-sizing: border-box;
  line-height: 35px;
  padding 0 10px;
  width: calc(100% - 150px);
  border-radius: 5px;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
`;

const SmallInput = styled.input`
box-sizing: border-box;
  line-height: 35px;
  padding 0 10px;
  width: calc(100% - 150px - 100px - 10px);
  border-radius: 5px;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
`;

const DupBtn = styled.div`
  box-sizing: border-box;
  background-color: ${colors.COLOR_MAIN};
  color: white;
  cursor: pointer;
  width: 100px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-radius: 5px;
`;
