import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../common/color';

import ChattingBox from './ChattingBox';
import { db, realTimeDatabase } from '../../../config/firebase';

import useUser from '../../../hooks/useUser';
import { useEffect } from 'react';

const AuctionChattingBox = ({}) => {
  return (
    <ChattingBox>
      <Status>경매 진행 중</Status>
    </ChattingBox>
  );
};

export default AuctionChattingBox;

const Status = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: ${colors.COLOR_MAIN};
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
