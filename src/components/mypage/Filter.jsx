import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { colors } from "../../common/color";

const itemHeight = "35px";

const Filter = ({ filter, setFilter, filterList }) => {
  const [click, setClick] = useState(false);

  return (
    <Container>
      <FilterBox onClick={() => setClick(!click)}>
        {filter}

        <FontAwesomeIcon
          icon={click ? faChevronUp : faChevronDown}
          style={{ marginLeft: "7px", fontSize: "12px" }}
        />

        {click ? (
          <FilterListBox>
            {filterList.map((text, idx) => (
              <Item key={`${text}_${idx}`}>{text}</Item>
            ))}
          </FilterListBox>
        ) : null}
      </FilterBox>
    </Container>
  );
};

export default Filter;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
`;

const FilterBox = styled.div`
  border-bottom: 2px solid ${colors.COLOR_MAIN};
  height: 30px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${colors.COLOR_MAIN};
  cursor: pointer;
  position: relative;
`;

const FilterListBox = styled.div`
  width: 100%;
  position: absolute;
  top: 35px;
  left: 0;
  z-index: 10;
  background-color: white;
  box-shadow: 5px 10px 10px rgba(176, 176, 176, 0.6);
  border-radius: 3px;
  overflow: hidden;
`;

const Item = styled.p`
  width: 100%;
  text-align: center;
  line-height: ${itemHeight};
  transition: 0.3s;

  &:hover {
    background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  }
`;
