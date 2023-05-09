import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ExchangeMember = ({ memberA, memberB, fontWeight = "bold" }) => {
  return (
    <Title fontWeight={fontWeight}>
      {memberA} <FontAwesomeIcon icon={faArrowRight} /> {memberB}
    </Title>
  );
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
