import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPen, faRotate } from "@fortawesome/free-solid-svg-icons";

import { colors } from "../../common/color";
import { IdolList } from "../../constants/idol";
import { Category } from "../../constants/category";

import DropDownMenu from "../common/DropDownMenu";
import { TransactionType } from "../../constants/transactionType";
import { Region } from "../../constants/region";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../../config/firebase";

import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import useUser from "../../hooks/useUser";
import SearchBar from "../common/SearchBar";

const height = "28px";
const fontSize = "12px";

const initialStates = {
  idol: "내가 찾는 아이돌",
  category: "굿즈 종류",
  transactionType: "교환 방법",
  region: "지역",
};

const ExchangeSearchBar = ({ getExchangeList }) => {
  const user = useUser();
  const [idol, setIdol] = useState(initialStates.idol);
  const [category, setCategory] = useState(initialStates.category);
  const [transactionType, setTransactionType] = useState(
    initialStates.transactionType
  );
  const [region, setRegion] = useState(initialStates.region);

  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const setQueryString = (idol, category, transactionType, region, title) => {
    if (!idol && !category && !transactionType && !region && !title) {
      searchParams.delete("idol");
      searchParams.delete("category");
      searchParams.delete("transactionType");
      searchParams.delete("region");
      searchParams.delete("title");
    } else {
      if (idol) {
        searchParams.set("idol", idol);
      } else {
        searchParams.delete("idol");
      }
      if (category) {
        searchParams.set("category", category);
      } else {
        searchParams.delete("category");
      }
      if (transactionType) {
        searchParams.set("transactionType", transactionType);
      } else {
        searchParams.delete("transactionType");
      }
      if (region) {
        searchParams.set("region", region);
      } else {
        searchParams.delete("region");
      }
      if (title) {
        searchParams.set("title", title);
      } else {
        searchParams.delete("title");
      }
    }

    setSearchParams(searchParams);
  };
  const setInitialStates = () => {
    const idol = searchParams.get("idol");
    const category = searchParams.get("category");
    const transactionType = searchParams.get("transactionType");
    const region = searchParams.get("region");
    const title = searchParams.get("title");

    if (idol) {
      setIdol(idol);
    }
    if (category) {
      setCategory(category);
    }
    if (transactionType) {
      setTransactionType(transactionType);
    }
    if (region) {
      setRegion(region);
    }
    if (title) {
      setInput(title);
    }
  };

  const handleSearch = async () => {
    const _idol = idol === initialStates.idol ? null : idol;
    const _category = category === initialStates.category ? null : category;
    const _region = region === initialStates.region ? null : region;
    const _transactionType =
      transactionType === initialStates.transactionType
        ? null
        : transactionType;

    setQueryString(_idol, _category, _transactionType, _region, input);

    await getExchangeList(_idol, _category, _region, _transactionType, input);
  };

  const onRefresh = async () => {
    setIdol(initialStates.idol);
    setCategory(initialStates.category);
    setRegion(initialStates.region);
    setTransactionType(initialStates.transactionType);
    setInput("");

    setQueryString();

    await getExchangeList();
  };

  useEffect(() => {
    setInitialStates();
  }, []);

  return (
    <Container>
      <Inner>
        <Wrapper>
          <DropDownMenu
            width="150px"
            height={height}
            fontSize={fontSize}
            margin="0 5px 0 0"
            list={IdolList}
            selected={idol}
            setSelected={setIdol}
          />
          <DropDownMenu
            width="150px"
            height={height}
            fontSize={fontSize}
            margin="0 5px 0 0"
            list={Category}
            selected={category}
            setSelected={setCategory}
          />
          <DropDownMenu
            width="100px"
            height={height}
            fontSize={fontSize}
            margin="0 5px 0 0"
            list={TransactionType}
            selected={transactionType}
            setSelected={setTransactionType}
          />
          <DropDownMenu
            width="80px"
            height={height}
            fontSize={fontSize}
            margin="0 5px 0 0"
            list={Region}
            selected={region}
            setSelected={setRegion}
          />

          <SearchBar
            input={input}
            setInput={setInput}
            onClick={handleSearch}
            width={"170px"}
            placeholder="멤버를 검색하세요"
          />

          <RotateIcon onClick={onRefresh}>
            초기화
            <FontAwesomeIcon icon={faRotate} style={{ marginLeft: "3px" }} />
          </RotateIcon>
        </Wrapper>

        <BtnWrap>
          <Btn onClick={handleSearch}>
            검색하기
            <FontAwesomeIcon icon={faSearch} style={{ paddingLeft: "7px" }} />
          </Btn>

          {user && (
            <Btn onClick={() => navigate("/exchange/post")}>
              <FontAwesomeIcon icon={faPen} />
            </Btn>
          )}
        </BtnWrap>
      </Inner>
    </Container>
  );
};

export default ExchangeSearchBar;

const Container = styled.div`
  width: 100%;
  background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  padding: 10px 0;
`;

const Inner = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Btn = styled.p`
  box-sizing: border-box;
  background-color: ${colors.COLOR_MAIN};
  color: white;
  font-weight: bold;
  height: ${height};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin-left: 5px;
  border-radius: 5px;
  font-size: ${fontSize};
  border: 1px solid ${colors.COLOR_MAIN};
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RotateIcon = styled.div`
  color: ${colors.COLOR_GRAY_TEXT};
  font-size: 12px;
  // background-color: orange;
  cursor: pointer;
`;
