import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";
import { timestampToDateTimeFormat } from "../../common/date";
import { moneyFormat } from "../../common/money";

const SndMessage = ({ chat }) => {
  const { id, biddingPrice, username, nickname, timestamp } = chat;

  return (
    <Container>
      <Date>{timestampToDateTimeFormat(timestamp)}</Date>

      <Message>{moneyFormat(biddingPrice)} 원</Message>
    </Container>
  );
};

export default SndMessage;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  //   background-color: orange;
  padding: 10px 0;
`;

const Date = styled.p`
  color: ${colors.COLOR_DARKGRAY_TEXT};
  font-size: 10px;
  margin-right: 7px;
`;

const Message = styled.div`
  box-sizing: border-box;
  background-color: ${colors.COLOR_SEND_MESSAGE};
  padding: 10px 20px;
  border-radius: 20px;
  max-width: 65%;
  white-space: normal;
  word-wrap: break-word;
  line-height: 24px;
`;
