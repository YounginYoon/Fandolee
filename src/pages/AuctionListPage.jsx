import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from "../common/color";
import { db, authService, storage } from '../config/firebase';
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
  const [AuctionImage, setImage] = useState();

  const filtering = () =>{
    const postDB = db.collection("product");
    

    postDB
      .where('category','==',Category)
      .where('idol','==',Selected)
      .get()
      .then((result) => {
        result.map((doc)=>{
          console.log(doc.data().title);
          setImage(doc.data().image);
          <ProductContainer>
            <ProductImg image={AuctionImage} />

            <ProductOwner owner={{}} />

            <ProductTitle title={doc.data().title} />
          </ProductContainer>
        });
        
      })
      .catch((err) => {
        console.log("검색 filtering 실패 : ", err);
      });
            
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