import React, { useState } from "react";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPen } from "@fortawesome/free-solid-svg-icons";

import { colors } from "../../common/color";
import { IdolList } from "../../constants/idol";
import { Category } from "../../constants/category";

import DropDownMenu from "../common/DropDownMenu";
import { TransactionType } from "../../constants/transactionType";
import { Region } from "../../constants/region";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";

import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import useUser from "../../hooks/useUser";
import SearchBar from "../common/SearchBar";

const height = "28px";
const fontSize = "12px";

const ExchangeSearchBar = ({ setProducts, setLoading }) => {
  const user = useUser();
  const [idol, setIdol] = useState("내가 찾는 아이돌");
  const [category, setCategory] = useState("굿즈 종류");
  const [method, setMethod] = useState("교환방법");
  const [region, setRegion] = useState("지역");

  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    const productDB = collection(db, "exchange");

    try {
      let q = query(productDB, where("isComplete", "==", 0), orderBy("date"));
      if (idol !== "내가 찾는 아이돌") {
        q = query(q, where("idol", "==", idol));
      }
      if (category !== "굿즈 종류") {
        q = query(q, where("category", "==", category));
      }

      if (method !== "교환방법") {
        q = query(q, where("transactionType", "==", method));
      }
      if (region !== "지역") {
        q = query(q, where("region", "==", region));
      }
      const ret = await getDocs(q);
      const newData = ret.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const products = newData.filter((product) => {
        return product.wantMember.includes(input);
      });

      setProducts(products);
    } catch (err) {
      console.log("err:", err);
    }

    setLoading(false);
  };

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
            selected={method}
            setSelected={setMethod}
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

          <SearchBar input={input} setInput={setInput} onClick={handleSearch} />
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
