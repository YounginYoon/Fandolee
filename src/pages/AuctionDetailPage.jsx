<<<<<<< HEAD
import React, { useEffect, useRef, useState } from 'react';
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import ProductOwner from "../components/common/ProductOwner";
import AuctionDetailInfo from "../components/auction/AuctionDetailInfo";
import GreenLine from "../components/common/GreenLine";

const AuctionDetailPage = () => {
  const dataID = useParams();

  const id = dataID.id;

  const [product, setProduct] = useState(null);

  const DetailProduct = async () => {
    const docRef = doc(db, "product", id);
    const docSnap = await getDoc(docRef);

    try {
      //만약 존재하면 콘솔창에 표시.
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
    } catch (error) {
      console.log('detail Page : ', error);
    }
  };

  const goAuctionBiddingPage = () => {
    navigate(`/auction/auctionbidding/${id}`);
  };
  useEffect(() => {
    DetailProduct();
  }, []);

  return (
    <div>
      <img src={product.image} style={{ width: 100, height: 100 }}></img>

      <h1>{product.title}</h1>
      <h2>
        가격: {product.minPrice} ~ {product.maxPrice}
      </h2>
      <h2>굿즈 종류 : {product.category}</h2>
      <h2>아이돌 : {product.idol}</h2>
      <h2>좋아요 : {product.likes}</h2>
      <button onClick={goAuctionBiddingPage}>경매참여</button>
      <h2>상품 정보 : {product.info}</h2>
    </div>
  );
};

export default AuctionDetailPage;

const Container = styled.div``;
