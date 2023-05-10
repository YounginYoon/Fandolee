import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colors } from "../../common/color";
import { Category } from "../../constants/category";
import { IdolList } from "../../constants/idol";
import DropDownMenu from "../common/DropDownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";

import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
const AuctionSearchBar = ({ setProducts }) => {
  const [idol, setIdol] = useState("내가 찾는 아이돌");
  const [category, setCategory] = useState("굿즈 종류");

  const navigate = useNavigate();

  const goAuctionUpPage = () => {
    navigate("/auction/post");
  };

  const handleSearch = async () => {
    const productDB = collection(db, "product");

    try {
      const q = query(
        productDB,
        where("category", "==", category),
        where("idol", "==", idol),
        orderBy("endDate")
      );
      const ret = await getDocs(q);
      const products = ret.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(products);
    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <Container>
      <Inner>
        <Wrapper>
          <DropDownMenu
            width="200px"
            margin="0 10px 0 0"
            list={IdolList}
            selected={idol}
            setSelected={setIdol}
          />
          <DropDownMenu
            width="200px"
            margin="0 10px 0 0"
            list={Category}
            selected={category}
            setSelected={setCategory}
          />

          <Btn onClick={handleSearch}>
            검색하기
            <FontAwesomeIcon icon={faSearch} style={{ paddingLeft: "7px" }} />
          </Btn>
        </Wrapper>

        <Btn onClick={goAuctionUpPage}>
          글 올리기{" "}
          <FontAwesomeIcon icon={faPen} style={{ paddingLeft: "7px" }} />
        </Btn>
      </Inner>
    </Container>
  );
};

export default AuctionSearchBar;

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
