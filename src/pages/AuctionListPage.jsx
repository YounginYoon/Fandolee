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
  

  const [selected, setSelected] = useState("Your Idol");
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const [category, setCategory] = useState("Goods");
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const [products, setProducts] = useState([])
  //거래 데이터
  
  
  //전체 거래 정보를 가져온다.
  const getAuctionList = async() =>{
    const productAllDB = collection(db, "product");

    try{
      const queryAll = await query(
        productAllDB,
        orderBy('end_date')
      );
      const data = await getDocs(queryAll);
      const newData = data.docs.map(doc => ({
        ...doc.data()
      }));

      setProducts(newData)
    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    getAuctionList()
  }, [])

  useEffect(() => {
    console.log('products: ', products)
  }, [products])

  //필터링 된 거래 정보를 가져온다.
  const filtering = async() =>{
    const productDB = collection(db,"product");
    
    try{
      const q = await query(
        productDB,
        where('category','==',category),
        where('idol','==',selected),
        orderBy('end_date')
      );
      const data = await getDocs(q);
      const newData = data.docs.map(doc => ({
        ...doc.data()
      }));
      
      setProducts(newData)
      
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
          value={selected}
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
          value={category}
          placeholder="카테고리"
        >
          {categoryList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
      </select>
      <button onClick={filtering}>검색하기</button>
      
      <button onClick={goAuctionUpPage}>글올리기</button>
      
      {products.map((item,index)=>{
        // console.log('item: ', item.title)
        return (
          <AuctionContainer data={item}/>
        )
      })}
      
      

      


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