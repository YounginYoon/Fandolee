import React from "react";
import styled from "styled-components";

import { ImageSizeTable } from "./ProductImg";
import { colors } from "../../common/color";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ input, setInput, onClick }) => {
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <SearchInputDiv>
      <SearchInput
        placeholder="어떤 상품을 찾으시나요?"
        value={input}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />

      <SearchIcon>
        <FontAwesomeIcon icon={faSearch} />
      </SearchIcon>
    </SearchInputDiv>
  );
};

export default SearchBar;

const SearchInputDiv = styled.div`
  width: max-content;
  position: relative;
  height: 28px;
  margin-right: 5px;
  //   background-color: aqua;
`;
const SearchInput = styled.input`
  box-sizing: border-box;
  background-color: ${colors.COLOR_LIGHTGRAY_BACKGROUND};
  width: 220px;
  height: 100%;
  border-radius: 30px;
  border: 1px solid ${colors.COLOR_MAIN};
  //   border: 1px solid ${colors.COLOR_GRAY_BORDER};
  display: flex;
  align-items: center;
  padding: 0 32px 0 15px;
  font-size: 12px;
`;

const SearchIcon = styled.div`
  //   background-color: orange;
  cursor: pointer;
  height: 100%;
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 12px;
  color: ${colors.COLOR_MAIN};
`;
