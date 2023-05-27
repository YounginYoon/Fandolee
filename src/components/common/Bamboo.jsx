import React, { useEffect } from 'react';

import styled from 'styled-components';
import { colors } from '../../common/color';
import { db } from '../../config/firebase';
import useUser from '../../hooks/useUser';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const Bamboo = ({ user, size = 'L' }) => {
  const [bamboo, setBamboo] = useState(0);

  const getBamboo = async () => {
    if (user) {
      const bambooRef = doc(db, 'bamboo', user.uid);
      const bambooDoc = await getDoc(bambooRef);
      if (bambooDoc.exists()) {
        const data = bambooDoc.data();
        const count = data.count;
        const score = data.score;
        const bambooScore = score / count;
        const bambooInt = Number.isInteger(bambooScore)
          ? bambooScore
          : bambooScore.toFixed(1);
        setBamboo(bambooInt);
      }
    }
  };
  useEffect(() => {
    getBamboo();
  }, []);
  return (
    <BambooDiv>
      <BambooNum
        style={size === 'S' ? { fontSize: '14px', marginBottom: '5px' } : {}}
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
    width: '200px',
    height: '18px',
  },
  L: {
    width: '400px',
    height: '25px',
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
