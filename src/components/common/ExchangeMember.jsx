import React from "react";
import styled from "styled-components";

const ExchangeMember = ({ memberA, memberB, fontWeight = "400" }) => {
  return <Title fontWeight={fontWeight}>{memberA} - {memberB}</Title>;
};

export default ExchangeMember;

const Title = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
  font-weight: ${({ fontWeight }) => fontWeight};
`;
