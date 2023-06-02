import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { colors } from "../../common/color";

const itemHeight = "35px";

const DropDownMenu = ({
  list,
  selected,
  setSelected,
  width,
  height = itemHeight,
  margin = "0",
  fontSize = "14px",
}) => {
  const [open, setOpen] = useState(false);

  const onClick = (item) => {
    setOpen(false);
    setSelected(item);
  };

  return (
    <Container margin={margin} fontSize={fontSize}>
      <SelectedBox onClick={() => setOpen(!open)}>
        <Selected width={width} height={height}>
          {selected}
        </Selected>
        <Icon width={height}>
          <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
        </Icon>
      </SelectedBox>

      {open ? (
        <SelectList width={width} height={height}>
          {list.map((item, idx) => (
            <SelectItem
              key={`${item}_${idx}`}
              onClick={() => onClick(item)}
              height={height}
            >
              {item}
            </SelectItem>
          ))}
        </SelectList>
      ) : null}
    </Container>
  );
};

export default DropDownMenu;

const Container = styled.div`
  position: relative;
  margin: ${({ margin }) => margin};
  font-size: ${({ fontSize }) => fontSize};
`;

const SelectedBox = styled.div`
  position: relative;
  width: max-content;
  cursor: pointer;
`;

const Selected = styled.p`
  box-sizing: border-box;
  width: ${({ width }) => width};
  background-color: white;
  height: ${({ height }) => height};
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: ${({ height }) => `calc(${height} + 10px)`};
  border-radius: 5px;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${({ width }) => width};
  position: absolute;
  top: 0;
  right: 0;
  color: ${colors.COLOR_GRAY_BACKGROUND};
  // background-color: orange;
`;

const SelectList = styled.div`
  position: absolute;
  top: ${({ height }) => `calc(${height} + 2px)`};
  left: 0;
  z-index: 1000;
  background-color: white;
  border-radius: 3px;
  width: ${({ width }) => width};
  max-height: ${({ height }) => `calc(${height} * 8)`};
  height: max-content;
  overflow-y: auto;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  box-sizing: border-box;
  box-shadow: 5px 10px 10px 0 rgba(176, 176, 176, 0.5);
`;

const SelectItem = styled.p`
  width: 100%;
  box-sizing: border-box;
  line-height: ${({ height }) => height};
  padding: 0 15px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  }
`;
