import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../config/color";

const LoginPage = () => {
  const navigate = useNavigate();
  const onLogin = async () => {};
  return (
    <LoginDiv>
      <LoginBox>
        <LoginHeader>Welcome! 로그인을 해주세요.</LoginHeader>

        <InputDiv>
          <Label>이메일</Label>
          <Input placeholder="이메일을 입력해주세요" />
        </InputDiv>
        <InputDiv>
          <Label>비밀번호</Label>
          <Input placeholder="비밀번호를 입력해주세요" type="password" />
        </InputDiv>

        <div style={{ marginBottom: "70px" }}></div>

        <Button
          color={colors.COLOR_WHITE_TEXT}
          backgroundColor={colors.COLOR_MAIN}
        >
          로그인
        </Button>
        <Button
          color={colors.COLOR_MAIN}
          backgroundColor={colors.COLOR_MAIN_BACKGROUND}
          onClick={() => navigate("/user/signup")}
        >
          회원가입
        </Button>
      </LoginBox>
    </LoginDiv>
  );
};

export default LoginPage;

const LoginDiv = styled.div`
  //   background-color: orange;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

const LoginBox = styled.div`
  width: 500px;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 25px;
`;

const LoginHeader = styled.div`
  color: ${colors.COLOR_MAIN};
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 70px;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.p`
  font-weight: bold;
  text-align: center;
  width: 120px;
`;

const Input = styled.input`
  width: calc(100% - 140px);
  line-height: 40px;
  padding: 0 10px;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  border-radius: 5px;
`;

const Button = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  line-height: 45px;
  text-align: center;
  margin: 0 auto;
  font-weight: bold;
  border: 2px solid ${colors.COLOR_MAIN};
  margin-bottom: 10px;
  cursor: pointer;
`;
