import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { db, authService, storage } from "../config/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import useUser from "../hooks/useUser";

import AuctionList from "../components/auction/AuctionList";
import AuctionSearchBar from "../components/auction/AuctionSearchBar";
import Loading from "../components/common/Loading";

const AuctionListPage = () => {
  const user = useUser();

  const [products, setProducts] = useState(null);
  //거래 데이터

  //전체 거래 정보를 가져온다.
  const getAuctionList = async () => {
    const productAllDB = collection(db, "product");

    try {
      const queryAll = query(productAllDB, orderBy("date", "desc"));
      const data = await getDocs(queryAll);

      const newData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // console.log("newData: ", newData);
      setProducts(newData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAuctionList();
  }, []);

  if (!products) {
    return <Loading />;
  }

  return (
    <Container>
      <AuctionSearchBar setProducts={setProducts} />

      <AuctionList products={products} />
    </Container>
  );
};

export default AuctionListPage;

const Container = styled.div``;
