import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { colors } from "../../common/color";

const HeaderInput = () => {
  return (
    <SearchInputDiv>
      <SearchInput placeholder="어떤 상품을 찾으시나요?" />

      <SearchIcon>
        <FontAwesomeIcon icon={faSearch} />
      </SearchIcon>
    </SearchInputDiv>
  );
};

export default HeaderInput;

const SearchInputDiv = styled.div`
  width: max-content;
  position: relative;
  margin: 0 50px;
  //   background-color: aqua;
`;
const SearchInput = styled.input`
  background-color: ${colors.COLOR_LIGHTGRAY_BACKGROUND};
  width: 350px;
  height: 33px;
  border-radius: 30px;
  border: 2px solid ${colors.COLOR_MAIN};
  display: flex;
  align-items: center;
  padding: 0 38px 0 15px;
`;

const SearchIcon = styled.div`
  //   background-color: orange;
  cursor: pointer;
  height: 33px;
  width: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 14px;
  color: ${colors.COLOR_MAIN};
`;
