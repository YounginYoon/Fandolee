import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from "../common/color";

import { db, authService, storage } from '../config/firebase';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import useUser from '../hooks/useUser';


import AuctionContainer from '../components/auction/AuctionContainer';
import ProductContainer from "../components/common/ProductContainer";
import ProductImg from "../components/common/ProductImg";
import ProductOwner from "../components/common/ProductOwner";
import ProductTitle from "../components/common/ProductTitle";

const AuctionListPage = () => {
  const user = useUser();
  

  const navigate = useNavigate();
  const goAuctionUpPage = () => {
    navigate(`/auction/auctionUp`);
  };

  // 카테고리, 아이돌 그룹 선택하여 검색 필터링
  const selectList = [
    "Your Idol",
    "BTS",
    "SKZ",
    "SVT",
    "NCT DREAM",
    "Black Pink",
    "MONSTA X",
    "NCT 127",
    "IVE",
    "NEW JEANS",
    "NCT",
  ];
  const categoryList = ["Goods", "Albums", "MD", "Tickets", "Photo Cards"];
  

  const [Selected, setSelected] = useState("Your Idol");
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const [Category, setCategory] = useState("Goods");
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  //거래 데이터
  let data, newData;
  
  const filtering = async() =>{
    const productDB = collection(db,"product");
    
    try{
      const q = await query(
        productDB,
        where('category','==',Category),
        where('idol','==',Selected),
        orderBy('end_date')
      );
      data = await getDocs(q);
      newData = data.docs.map(doc => ({
        ...doc.data()
      }));
      console.log(newData);
      
      //new Data에 필터링한 Auctions 저장하기.
    }catch(err){
      console.log("error!!",err);
    }
    

            
  };

  if (user)
  return(
    <div>
      <select
          onChange={handleSelect}
          value={Selected}
          placeholder="아이돌그룹"
        >
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
      </select>
      <select
          onChange={handleCategory}
          value={Category}
          placeholder="카테고리"
        >
          {categoryList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
      </select>
      <button onClick={filtering}>검색하기</button>
      <AuctionContainer/>
      <button onClick={goAuctionUpPage}>글올리기</button>

      


    </div>
    
  );

};


export default AuctionListPage;


const AuctionImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${colors.COLOR_DARKGRAY_BACKGROUND};
  background-size: cover;
`;