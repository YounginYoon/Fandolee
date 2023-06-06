import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { db, authService, storage } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  or,
  and,
} from "firebase/firestore";
import useUser from "../hooks/useUser";

import AuctionList from "../components/auction/AuctionList";
import AuctionSearchBar from "../components/auction/AuctionSearchBar";
import Loading from "../components/common/Loading";
import { useSearchParams } from "react-router-dom";

const AuctionListPage = () => {
  const [products, setProducts] = useState(null);
  //거래 데이터
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  //전체 거래 정보를 가져온다.
  const getAuctionList = async (idol, category, title) => {
    const productDB = collection(db, "product");

    try {
      setLoading(true);

      let q = null;
      if (idol || category) {
        if (!idol || !category) {
          q = query(
            productDB,
            or(where("idol", "==", idol), where("category", "==", category))
          );
        } else {
          q = query(
            productDB,
            where("idol", "==", idol),
            where("category", "==", category)
          );
        }
      } else {
        q = query(productDB, orderBy("date", "desc"));
      }

      const ret = await getDocs(q);
      const newData = ret.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const newProducts = !title
        ? [...newData]
        : newData.filter((product) => {
            const inputArray = title.split(" ");
            const isAllIncluded = inputArray.every((el) =>
              product.title.includes(el)
            );
            return isAllIncluded;
          });
      setProducts(newProducts);

      setLoading(false);
    } catch (err) {
      console.log("getProductList err: ", err);
    }
  };

  useEffect(() => {
    const idol = searchParams.get("idol");
    const category = searchParams.get("category");
    const title = searchParams.get("title");

    // console.log({ idol, category, title });
    getAuctionList(idol, category, title);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <AuctionSearchBar getAuctionList={getAuctionList} />

      <AuctionList products={products} />
    </Container>
  );
};

export default AuctionListPage;

const Container = styled.div`
  position: relative;
`;
