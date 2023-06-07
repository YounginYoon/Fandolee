import React from "react";
import styled from "styled-components";

const Loading = ({ size = "150px" }) => {
  return (
    <Container>
      <Spinner size={size} src="/img/Spinner.gif" />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const Spinner = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;
