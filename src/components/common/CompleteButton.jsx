import React from 'react';

import styled from 'styled-components';
import { colors } from '../../common/color';
import { useState } from 'react';
import { useEffect } from 'react';

const CompleteButton = ({ postingMode }) => {
  const [mode, setMode] = useState(null);

  useEffect(() => {
    if (postingMode === 'auction') {
      setMode('낙찰');
    } else if (postingMode === 'exchange') {
      setMode('교환');
    } else if (postingMode === 'purchase') {
      setMode('거래');
    }
  });
  return <Btn>{mode} 완료하기</Btn>;
};

export default CompleteButton;

const Btn = styled.div`
  width: 88%;
  background-color: ${colors.COLOR_BLUE_TEXT};
  line-height: 45px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  text-align: center;
  border-radius: 7px;
`;
