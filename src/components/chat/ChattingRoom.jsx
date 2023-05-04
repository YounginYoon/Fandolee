import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { colors } from "../../common/color";
import RcvMessage from "./RcvMessage";
import SndMessage from "./SndMessage";

const ChattingRoom = () => {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  return (
    <Container>
      <ChattingWrap>
        <Chatting>
          <RcvMessage />
          <SndMessage />
          <RcvMessage />
          <SndMessage />
          <RcvMessage />
          <SndMessage />
          <RcvMessage />
          <SndMessage />
          <RcvMessage />
          <SndMessage />
          <RcvMessage />
          <SndMessage />
        </Chatting>
      </ChattingWrap>

      <InputBox>
        <Input value={input} onChange={onChange} />

        <SendBtn>전송</SendBtn>
      </InputBox>
    </Container>
  );
};

export default ChattingRoom;

const Container = styled.div`
  box-sizing: border-box;
  width: 600px;
  height: max-content;
  border-radius: 5px;
  border: 2px solid ${colors.COLOR_MAIN};
  margin-left: 30px;
`;

const ChattingWrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  position: relative;

  background-image: url("/img/fandol.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 25%;
`;

const Chatting = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 10;
  padding: 10px;
`;

const InputBox = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Input = styled.input`
  border: 2px solid ${colors.COLOR_GREEN_BORDER};
  border-radius: 5px;
  background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  width: 70%;
  padding: 0 10px;
  line-height: 40px;
`;

const SendBtn = styled.div`
  border-radius: 5px;
  background-color: ${colors.COLOR_MAIN};
  color: white;
  font-weight: bold;
  line-height: 44px;
  text-align: center;
  width: 18%;
  cursor: pointer;
`;
