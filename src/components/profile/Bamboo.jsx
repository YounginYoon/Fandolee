import React from "react";
import styled from "styled-components";
import { colors } from "../../config/color";

const Bamboo = ({ nickname, bamboo }) => {
  return (
    <Container>
      <Nickname>{nickname}</Nickname>

      <BambooDiv>
        <BambooNum>{bamboo} 밤부</BambooNum>

        <BambooBar>
          <BambooStat bamboo={bamboo} />
        </BambooBar>
      </BambooDiv>
    </Container>
  );
};

export default Bamboo;

const Container = styled.div``;

const Nickname = styled.p`
  font-size: 22px;
  font-weight: bold;
`;

const BambooDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const BambooNum = styled.p`
  color: ${colors.COLOR_MAIN};
  font-weight: bold;
  margin-bottom: 10px;
`;

const BambooBar = styled.div`
  background-color: ${colors.COLOR_FOOTER};
  width: 450px;
  height: 28px;
  border-radius: 20px;
`;

const BambooStat = styled.div`
  width: ${({ bamboo }) => `${bamboo * 10}%`};
  background-color: ${colors.COLOR_MAIN};
  height: 100%;
  border-radius: 20px;
`;
