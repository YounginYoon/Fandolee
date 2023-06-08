import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colors } from "../../common/color";
import { Category } from "../../constants/category";
import { IdolList } from "../../constants/idol";
import DropDownMenu from "../common/DropDownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faSearch,
  faRotateRight,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../../config/firebase";

import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import useUser from "../../hooks/useUser";
import SearchArea from "../common/SearchArea";
import SearchBar from "../common/SearchBar";
import AuctionList from "./AuctionList";

const height = "28px";
const fontSize = "12px";

const initialIdol = "내가 찾는 아이돌";
const initialCategory = "굿즈 종류";

const AuctionSearchBar = ({ getAuctionList }) => {
  const user = useUser();
  const [idol, setIdol] = useState(initialIdol);
  const [category, setCategory] = useState(initialCategory);

  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const goAuctionUpPage = () => {
    navigate("/auction/post");
  };

  const setQueryString = (idol, category, title) => {
    if (idol === initialIdol && category === initialCategory && !title) {
      searchParams.delete("idol");
      searchParams.delete("category");
      searchParams.delete("title");
    } else {
      if (idol !== initialIdol) {
        searchParams.set("idol", idol);
      } else {
        searchParams.delete("idol");
      }
      if (category !== initialCategory) {
        searchParams.set("category", category);
      } else {
        searchParams.delete("category");
      }
      if (title) {
        searchParams.set("title", title);
      } else {
        searchParams.delete("title");
      }
    }

    setSearchParams(searchParams);
  };
  const handleSearch = async () => {
    const _idol = idol === initialIdol ? null : idol;
    const _category = category === initialCategory ? null : category;
    setQueryString(idol, category, input);

    await getAuctionList(_idol, _category, input);
  };

  const setInitialStates = () => {
    const _idol = searchParams.get("idol");
    const _category = searchParams.get("category");
    const _title = searchParams.get("title");

    if (_idol) {
      setIdol(_idol);
    }
    if (_category) {
      setCategory(_category);
    }
    if (_title) {
      setInput(_title);
    }
  };

  const onRefresh = async () => {
    setIdol(initialIdol);
    setCategory(initialCategory);
    setInput("");
    setQueryString(initialIdol, initialCategory, "");
    await getAuctionList();
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

          <SearchBar
            input={input}
            setInput={setInput}
            onClick={handleSearch}
            placeholder="상품을 검색하세요"
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
            <Btn onClick={goAuctionUpPage}>
              <FontAwesomeIcon icon={faPen} />
            </Btn>
          )}
        </BtnWrap>
      </Inner>
    </Container>
  );
};

export default AuctionSearchBar;

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
  // background-color: orange;
`;

const RotateIcon = styled.div`
  color: ${colors.COLOR_GRAY_TEXT};
  font-size: 12px;
  // background-color: orange;
  cursor: pointer;
`;
