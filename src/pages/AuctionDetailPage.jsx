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
        console.log("detail data: ", docSnap.data());
        setProduct(docSnap.data());
      }
    } catch (error) {
      console.log("detail Page : ", error);
    }
  };

  useEffect(() => {
    DetailProduct();
  }, []);

  if (!product) {
    return <></>;
  }

  return (
    <Container>
      <AuctionDetailInfo product={product} />

      <GreenLine />
    </Container>
  );
};

export default AuctionDetailPage;

const Container = styled.div``;
