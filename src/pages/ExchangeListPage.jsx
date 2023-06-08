import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ExchangeList from "../components/exchange/ExchangeList";
import ExchangeSearchBar from "../components/exchange/ExchangeSearchBar";

import { db } from "../config/firebase";
import {
  collection,
  query,
  getDocs,
  orderBy,
  where,
  or,
} from "firebase/firestore";

import Loading from "../components/common/Loading";
import { useSearchParams } from "react-router-dom";

const ExchangeListPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  //exchange 데이터

  const [searchParams, setSearchParams] = useSearchParams();

  const getExchangeList = async (
    idol,
    category,
    region,
    transactionType,
    title
  ) => {
    const exchangeRef = collection(db, "exchange");

    try {
      setLoading(true);

      let q = null;
      if (idol || category || region || transactionType) {
        // const obj = {
        //   idol,
        //   category,
        //   region,
        //   transactionType,
        // };

        // const arr = [];
        // for (let key in obj) {
        //   console.log(key);
        // }

        const condition = or(
          where("idol", "==", idol),
          where("category", "==", category),
          where("region", "==", region),
          where("transactionType", "==", transactionType)
        );

        q = query(exchangeRef, condition);
      } else {
        q = query(exchangeRef, orderBy("date", "desc"));
      }

      const ret = await getDocs(q);
      const newData = ret.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const exchanges = !title
        ? [...newData]
        : newData.filter((product) => {
            return (
              product.wantMember.includes(title) ||
              product.haveMember.includes(title)
            );
          });

      setProducts(exchanges);

      setLoading(false);
    } catch (err) {
      console.log("getExchangeList err: ", err);
    }
  };

  useEffect(() => {
    const idol = searchParams.get("idol");
    const category = searchParams.get("cateogry");
    const region = searchParams.get("region");
    const transactionType = searchParams.get("transactionType");
    const title = searchParams.get("title");

    getExchangeList(idol, category, region, transactionType, title);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <ExchangeSearchBar getExchangeList={getExchangeList} />

      <ExchangeList products={products} />
    </Container>
  );
};

export default ExchangeListPage;

const Container = styled.div``;
