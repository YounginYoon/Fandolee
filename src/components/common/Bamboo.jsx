import React from "react";

import styled from "styled-components";
import { colors } from "../../common/color";

const Bamboo = ({ bamboo }) => {
  return (
    <BambooDiv>
      <BambooNum>{bamboo}</BambooNum>

      <BambooBar>
        <BambooStat bamboo={bamboo} />
      </BambooBar>
    </BambooDiv>
  );
};

export default Bamboo;

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
  width: 400px;
  height: 25px;
  border-radius: 20px;
`;

const BambooStat = styled.div`
  width: ${({ bamboo }) => `${bamboo * 10}%`};
  background-color: ${colors.COLOR_MAIN};
  height: 100%;
  border-radius: 20px;
`;
