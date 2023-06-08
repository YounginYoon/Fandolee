import React, { useEffect, useState } from "react";

import { colors } from "../../common/color";
import styled from "styled-components";

import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  limit,
  orderBy,
} from "firebase/firestore";
import Loading from "../common/Loading";
import Product from "./Product";

const RandomProducts = () => {
  const [recommendedProducts, setRecommendProducts] = useState(null);

  const loadRandomProducts = async () => {
    try {
      const productRef = collection(db, "product");
      const exchangeRef = collection(db, "exchange");

      const q = query(
        //
        productRef,
        where("isComplete", "==", 0),
        limit(6)
      );
      const eq = query(
        //
        exchangeRef,
        where("isComplete", "==", 0),
        limit(6)
      );
      const productDocs = await getDocs(q);
      const exchangeDocs = await getDocs(eq);

      const productData = productDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        type: "auction",
      }));
      const exchangeData = exchangeDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        type: "exchange",
      }));

      let combineData = [...productData, ...exchangeData];
      combineData.sort((a, b) => b.likes - a.likes);
      combineData = combineData.slice(0, 6);

      setRecommendProducts(combineData);
    } catch (err) {
      console.log("RandomProducts err: ", err);
    }
  };

  useEffect(() => {
    loadRandomProducts();
  }, []);

  return !recommendedProducts ? (
    <Loading size={"100px"} />
  ) : (
    recommendedProducts.map((product) => (
      <Product key={`random_${product.id}`} product={product} />
    ))
  );
};

export default RandomProducts;
