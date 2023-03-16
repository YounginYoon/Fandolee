import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../config/color";

const SubLayout = () => {
  const navigate = useNavigate();
  return (
    <>
      <TitleDiv>
        <Title onClick={() => navigate("/")}>팬도리</Title>
      </TitleDiv>

      <>
        <Outlet />
      </>
    </>
  );
};

export default SubLayout;

const TitleDiv = styled.div`
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: ${colors.COLOR_MAIN};
  cursor: pointer;
`;
