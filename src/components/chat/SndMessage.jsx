import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";

const SndMessage = () => {
  return (
    <Container>
      <Date>2023-05-01 18:40</Date>

      <Message>
        안녕하세요ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
      </Message>
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
  font-size: 12px;
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
