import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import styled from 'styled-components';
import { colors } from '../common/color';
import { db, authService, storage } from '../config/firebase';
import { async } from '@firebase/util';
import { doc } from 'firebase/firestore';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [input, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    nickname: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    nickname: '',
  });

  //const { email, password, password_check, name, nickname } = inputs;

  const onSignUp = async () => {
    if (!input.email) {
      alert('이메일을 입력하세요!');
      return;
    } else {
      const EmailCheck = await db
        .collection('users')
        .where('email', '==', input.email)
        .get();
      if (EmailCheck.docs.length > 0) {
        alert('이메일을 확인하세요!');
        return;
      }
    }
    if (!input.password) {
      alert('비밀번호를 입력하세요!');
      return;
    } else if (input.password.length < 8 || input.password.length > 20) {
      alert('비밀번호를 8~20자로 입력하세요!');
      return;
    }
    if (!input.confirmPassword || input.confirmPassword !== input.password) {
      alert('비밀번호를 다시 확인하세요!');
      return;
    }
    if (!input.username) {
      alert('이름을 입력하세요!');
      return;
    }
    if (!input.nickname) {
      alert('닉네임을 입력하세요!');
      return;
    } else {
      const NicknameCheck = await db
        .collection('users')
        .where('nickName', '==', input.nickname)
        .get();
      if ((await NicknameCheck).docs.length > 0) {
        alert('닉네임을 확인하세요!');
        return;
      }
    }
    try {
      const ret = await createUserWithEmailAndPassword(
        authService,
        input.email,
        input.password
      );

      var user_info = {
        email: input.email,
        passWord: input.password,
        userName: input.username,
        nickName: input.nickname,
      };

      const user = ret.user;
      if (user) {
        console.log('1');
        await updateProfile(user, { displayName: input.nickname });
        // 프사 기본으로 지정
        const file = '/img/user.png';
        const imageRef = ref(storage, `profile_image/${user.uid}`);

        const response = await fetch(file);
        const blob = await response.blob();
        uploadBytes(imageRef, blob).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            updateProfile(user, { photoURL: url });
            window.location.reload();
          });
        });

        db.collection('users')
          .doc(user.uid)
          .set(user_info)
          .then((result) => {
            console.log(result);
            alert('회원가입이 완료되었습니다.');
            navigate('/user/login');
          });
      }
    } catch (err) {
      console.log('signup error', err);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
        case 'username':
          if (!value) {
            stateObj[name] = '이름을 입력하세요!';
          }
          break;
        case 'email':
          if (!value) {
            stateObj[name] = '이메일을 입력하세요!';
          } else {
            const check = db
              .collection('users')
              .where('email', '==', value)
              .get()
              .then((res) => {
                if (res.size > 0)
                  stateObj[name] = '이미 사용 중인 이메일 입니다.';
              });
          }
          break;
        case 'nickname':
          if (!value) {
            stateObj[name] = '닉네임을 입력하세요!';
          } else {
            const check = db
              .collection('users')
              .where('nickName', '==', value)
              .get()
              .then((res) => {
                if (res.size > 0)
                  stateObj[name] = '이미 사용 중인 닉네임 입니다.';
              });
          }
          break;
        case 'password':
          if (!value) {
            stateObj[name] = '비밀번호를 입력하세요!';
          } else if (value.length < 8) {
            stateObj[name] = '비밀번호가 너무 짧습니다. (8~20자)';
          } else if (value.length > 20) {
            stateObj[name] = '비밀번호가 너무 깁니다. (8~20자)';
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj['confirmPassword'] = '비밀번호가 일치하지 않습니다!';
          } else {
            stateObj['confirmPassword'] = input.confirmPassword
              ? ''
              : error.confirmPassword;
          }
          break;
        case 'confirmPassword':
          if (!value) stateObj[name] = '비밀번호를 다시 입력하세요!';
          if (input.password && value !== input.password) {
            stateObj[name] = '비밀번호가 일치하지 않습니다!';
          }
          break;
        default:
          break;
      }

      return stateObj;
    });
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      onSignUp();
    }
  };

  return (
    <SignUpDiv>
      <SignUpBox>
        <SignUpHeader>회원가입 입력정보</SignUpHeader>
        <InputDiv>
          <Label>이름</Label>
          <Input
            placeholder="이름을 입력해주세요"
            type="text"
            value={input.username}
            name="username"
            onChange={onChange}
            onBlur={validateInput}
          />
        </InputDiv>
        <ERRDIV>
          {error.username && <span className="err">{error.username}</span>}
        </ERRDIV>

        <InputDiv>
          <Label>닉네임</Label>
          <Input
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={input.nickname}
            name="nickname"
            onChange={onChange}
            onBlur={validateInput}
          />
        </InputDiv>
        <ERRDIV>
          {error.nickname && <span className="err">{error.nickname}</span>}
        </ERRDIV>

        <InputDiv>
          <Label>이메일</Label>
          <Input
            placeholder="이메일을 입력해주세요"
            type="email"
            value={input.email}
            name="email"
            onChange={onChange}
            onBlur={validateInput}
          />
        </InputDiv>
        <ERRDIV>
          {error.email && <div className="err">{error.email}</div>}
        </ERRDIV>

        <InputDiv>
          <Label>비밀번호</Label>
          <Input
            placeholder="비밀번호를 입력해주세요 (8~20자)"
            type="password"
            value={input.password}
            name="password"
            onChange={onChange}
            onBlur={validateInput}
          />
        </InputDiv>
        <ERRDIV>
          {error.password && <span className="err">{error.password}</span>}
        </ERRDIV>

        <InputDiv>
          <Label>비밀번호 확인</Label>
          <Input
            placeholder="비밀번호를 재입력해주세요"
            type="password"
            value={input.confirmPassword}
            name="confirmPassword"
            onChange={onChange}
            onBlur={validateInput}
            onKeyUp={onKeyUp}
          />
        </InputDiv>
        <ERRDIV>
          {error.confirmPassword && (
            <span className="err">{error.confirmPassword}</span>
          )}
        </ERRDIV>

        <div style={{ marginBottom: '70px' }}></div>

        <Button
          color={colors.COLOR_WHITE_TEXT}
          backgroundColor={colors.COLOR_MAIN}
          onClick={onSignUp}
        >
          회원가입
        </Button>
        <Button
          color={colors.COLOR_MAIN}
          backgroundColor={colors.COLOR_MAIN_BACKGROUND}
          onClick={() => navigate('/user/login')}
        >
          로그인
        </Button>
      </SignUpBox>
    </SignUpDiv>
  );
};

export default SignUpPage;

const SignUpDiv = styled.div`
  //   background-color: orange;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

const SignUpBox = styled.div`
  width: 600px;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 25px;
`;

const SignUpHeader = styled.div`
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
  width: 150px;
`;

const Input = styled.input`
  width: calc(100% - 170px);
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

const NicknameButton = styled.button`
  border-radius: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  text-align: center;
  margin: 0 auto;
  font-weight: bold;
  border: 2px solid ${colors.COLOR_DARKGRAY_BACKGROUND};
  margin-bottom: 10px;
  cursor: pointer;
`;

const ERRDIV = styled.div`
  width: 100%;
  text-align: center;
  color: ${colors.COLOR_RED_TEXT};
  font-size: small;
  margin-bottom: 10px;
`;
