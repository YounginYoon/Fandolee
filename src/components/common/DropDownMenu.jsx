import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { colors } from "../../common/color";

const itemHeight = "35px";

const DropDownMenu = ({ list, selected, setSelected, width, margin = "0" }) => {
  const [open, setOpen] = useState(false);

  const onClick = (item) => {
    setOpen(false);
    setSelected(item);
  };

  return (
    <Container margin={margin}>
      <SelectedBox onClick={() => setOpen(!open)}>
        <Selected width={width}>{selected}</Selected>
        <Icon>
          <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
        </Icon>
      </SelectedBox>

      {open ? (
        <SelectList width={width}>
          {list.map((item, idx) => (
            <SelectItem key={`${item}_${idx}`} onClick={() => onClick(item)}>
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
  height: 35px;
  display: flex;
  //   justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 45px;
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 35px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  color: ${colors.COLOR_GRAY_BACKGROUND};
`;

const SelectList = styled.div`
  position: absolute;
  top: 37px;
  left: 0;
  z-index: 100;
  background-color: white;
  border-radius: 3px;
  width: ${({ width }) => width};
  max-height: calc(${itemHeight} * 8);
  height: max-content;
  overflow-y: auto;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  box-sizing: border-box;
  box-shadow: 5px 10px 10px 0 rgba(176, 176, 176, 0.5);
`;

const SelectItem = styled.p`
  width: 100%;
  box-sizing: border-box;
  line-height: ${itemHeight};
  padding: 0 15px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  }
`;
