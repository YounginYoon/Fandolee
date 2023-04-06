import React from "react";
import styled from "styled-components";
import { colors } from "../../../common/color";

import ChattingBox from "./ChattingBox";

const ExchangeChattingBox = ({}) => {
  return (
    <ChattingBox>
      <Wrapper>
        <Message>
          안녕하세요! 포카 거래하고 싶습니다.안녕하세요! 포카 거래하고
          싶습니다.안녕하세요! 포카 거래하고 싶습니다.안녕하세요! 포카 거래하고
          싶습니다.안녕하세요! 포카 거래하고 싶습니다.
        </Message>

        <Date>2023-04-03 18:30</Date>
      </Wrapper>
    </ChattingBox>
  );
};

export default ExchangeChattingBox;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  //   background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Message = styled.p`
  font-size: 14px;
  width: 100%;
  color: ${colors.COLOR_DARKGRAY_TEXT};
  //   background-color: aqua;
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 20px;
`;

const Date = styled.p`
  height: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 11px;
  color: ${colors.COLOR_GRAY_TEXT};
`;
