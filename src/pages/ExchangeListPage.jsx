import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ExchangeList from "../components/exchange/ExchangeList";
import ExchangeSearchBar from "../components/exchange/ExchangeSearchBar";

import { db } from "../config/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";

import Loading from "../components/common/Loading";

const ExchangeListPage = () => {
  const [products, setProducts] = useState(null);
  //exchange 데이터

  const getExchangeList = async () => {
    const productAllDB = collection(db, "exchange");

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
    getExchangeList();
  }, []);

  if (!products) {
    return <Loading />;
  }

  return (
    <Container>
      <ExchangeSearchBar setProducts={setProducts} />

      <ExchangeList products={products} />
    </Container>
  );
};

export default ExchangeListPage;

const Container = styled.div``;
