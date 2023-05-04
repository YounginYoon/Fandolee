import React from "react";

import styled from "styled-components";
import { colors } from "../../common/color";

const Bamboo = ({ bamboo, size = "L" }) => {
  return (
    <BambooDiv>
      <BambooNum
        style={size === "S" ? { fontSize: "14px", marginBottom: "5px" } : {}}
      >
        {bamboo}
      </BambooNum>

      <BambooBar style={BambooSizeTable[size]}>
        <BambooStat bamboo={bamboo} />
      </BambooBar>
    </BambooDiv>
  );
};

export default Bamboo;

const BambooSizeTable = {
  S: {
    width: "200px",
    height: "18px",
  },
  L: {
    width: "400px",
    height: "25px",
  },
};

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
  background-color: rgba(82, 156, 64, 0.17);
  border-radius: 20px;
`;

const BambooStat = styled.div`
  width: ${({ bamboo }) => `${bamboo * 10}%`};
  background-color: ${colors.COLOR_MAIN};
  height: 100%;
  border-radius: 20px;
`;
