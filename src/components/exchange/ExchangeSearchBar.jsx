import React, { useState } from "react";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPen } from "@fortawesome/free-solid-svg-icons";

import { colors } from "../../common/color";
import { IdolList } from "../../constants/idol";
import { Category } from "../../constants/category";

import DropDownMenu from "../common/DropDownMenu";
import { exchangeMethod } from "../../constants/exchangeMethod";
import { regionList } from "../../constants/region";

const ExchangeSearchBar = () => {
  const [idol, setIdol] = useState("내가 찾는 아이돌");
  const [category, setCategory] = useState("굿즈 종류");
  const [method, setMethod] = useState("교환방법");
  const [region, setRegion] = useState("지역");

  return (
    <Container>
      <Inner>
        <Wrapper>
          <DropDownMenu
            width="180px"
            margin="0 10px 0 0"
            list={IdolList}
            selected={idol}
            setSelected={setIdol}
          />
          <DropDownMenu
            width="180px"
            margin="0 10px 0 0"
            list={Category}
            selected={category}
            setSelected={setCategory}
          />
          <DropDownMenu
            width="120px"
            margin="0 10px 0 0"
            list={exchangeMethod}
            selected={method}
            setSelected={setMethod}
          />
          <DropDownMenu
            width="100px"
            margin="0 10px 0 0"
            list={regionList}
            selected={region}
            setSelected={setRegion}
          />

          <Btn>
            검색하기
            <FontAwesomeIcon icon={faSearch} style={{ paddingLeft: "7px" }} />
          </Btn>
        </Wrapper>

        <Btn>
          글 올리기{" "}
          <FontAwesomeIcon icon={faPen} style={{ paddingLeft: "7px" }} />
        </Btn>
      </Inner>
    </Container>
  );
};

export default ExchangeSearchBar;

const Container = styled.div`
  width: 100%;
  background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  padding: 15px 0;
`;

const Inner = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Btn = styled.p`
  box-sizing: border-box;
  background-color: ${colors.COLOR_MAIN};
  color: white;
  font-weight: bold;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid ${colors.COLOR_MAIN};
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
