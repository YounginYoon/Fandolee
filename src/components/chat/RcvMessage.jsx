import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";
import { timestampToDateTimeFormat } from "../../common/date";
import { moneyFormat } from "../../common/money";

const RcvMessage = ({ message, timestamp, nickname }) => {
  return (
    <Container>
      <Nickname>{nickname}</Nickname>
      <ChatDiv>
        <Message>{message}</Message>

        <Date>{timestampToDateTimeFormat(timestamp)}</Date>
      </ChatDiv>
    </Container>
  );
};

export default RcvMessage;

const Container = styled.div`
  //   background-color: orange;
  padding: 10px 0;
  box-sizing: border-box;
  width: 100%;
`;
const Nickname = styled.p`
  font-size: 14px;
  margin-bottom: 7px;
  margin-left: 7px;
  //   color: ${colors.COLOR_MAIN};
`;

const ChatDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Date = styled.p`
  color: ${colors.COLOR_DARKGRAY_TEXT};
  font-size: 10px;
  margin-left: 7px;
`;

const Message = styled.div`
  box-sizing: border-box;
  background-color: ${colors.COLOR_RECEIVE_MESSAGE};
  padding: 10px 20px;
  border-radius: 20px;
  max-width: 65%;
  white-space: normal;
  word-wrap: break-word;
  line-height: 24px;
`;
