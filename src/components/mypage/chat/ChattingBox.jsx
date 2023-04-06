import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { colors } from "../../../common/color";
import ProductOwner from "../../common/ProductOwner";

const ChattingBox = ({ children }) => {
  const ref = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(ref.current.offsetWidth);
  }, []);

  return (
    <Container ref={ref} height={height}>
      <Box>
        <Dot />

        <Wrapper style={{ flex: 1 }}>
          <ProductOwner />

          <Title>MonstaX 최고</Title>
        </Wrapper>

        <Wrapper style={{ flex: 2 }}>{children}</Wrapper>
      </Box>
    </Container>
  );
};

export default ChattingBox;

const Container = styled.div`
  box-sizing: border-box;
  padding: 5px;
  width: 25%;
  height: ${({ height }) => height}px;
  //   background-color: aqua;
`;

const Box = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  border: 2px solid ${colors.COLOR_MAIN};
  cursor: pointer;
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  //   justify-content: space-between;
`;

const Dot = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 5;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${colors.COLOR_HEART};
`;

const Title = styled.p`
  font-weight: bold;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Wrapper = styled.div``;
