import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { colors } from "../../common/color";

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

import useExchanges from "../../hooks/useExchanges";
import { useLike } from "../../hooks/useHeart";
import { useLikeExchange } from "../../hooks/useHeartExchange";
import useProducts from "../../hooks/useProducts";
import useUser from "../../hooks/useUser";
import Loading from "../common/Loading";
import { useNavigate } from "react-router-dom";

const RecommendedProducts = () => {
  const user = useUser();

  // 사용자가 찜한 경매, 교환 상품 아이디 배열
  const auctionIds = useLike(user);
  const exchangeIds = useLikeExchange(user);

  // 사용자가 찜한 경매, 교환 상품 데이터 목록
  const products = useProducts(auctionIds);
  const exchanges = useExchanges(exchangeIds);

  const [idols, setIdols] = useState(null);
  const [recommendedProducts, setRecommendProducts] = useState(null);

  // 사용자가 찜한 경매, 교환 상품에서 아이돌 추출
  const getIdols = async () => {
    let ret = [];
    if (products.length > 0) {
      products.forEach((product) => {
        if (product.idol) {
          ret.push(product.idol);
        }
      });
    }
    if (exchanges.length > 0) {
      exchanges.forEach((product) => {
        if (product.idol) {
          ret.push(product.idol);
        }
      });
    }

    // 중복 제거
    ret = ret.filter((idol, idx) => ret.indexOf(idol) === idx);
    // console.log("getIdols result: ", ret);
    setIdols(ret);
  };

  const loadIdolProducts = async () => {
    try {
      const productRef = collection(db, "product");
      const exchangeRef = collection(db, "exchange");

      const q = query(
        productRef,
        where("idol", "in", idols),
        where("isComplete", "==", 0),
        limit(4)
      );
      const eq = query(
        exchangeRef,
        where("idol", "in", idols),
        where("isComplete", "==", 0),
        limit(4)
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
      console.log("loadIdolProducts err: ", err);
    }
  };

  const loadRandomProducts = async (len) => {
    try {
      const productRef = collection(db, "product");
      const exchangeRef = collection(db, "exchange");
      const limit = 6 - len;

      const q = query(productRef, where("isComplete", "==", 0), limit(limit));
      const eq = query(exchangeRef, where("isComplete", "==", 0), limit(limit));
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

      let combineData = [
        ...recommendedProducts,
        ...productData,
        ...exchangeData,
      ];
      combineData.sort((a, b) => b.likes - a.likes);
      combineData = combineData.slice(0, 6);

      setRecommendProducts(combineData);
    } catch (err) {
      console.log("loadRandomProducts err: ", err);
    }
  };

  const navigate = useNavigate();
  const onClick = (product) => {
    const { type, id } = product;
    const path = `/${type}/${type}detail/${id}`;
    navigate(path);
  };

  useEffect(() => {
    if (products && exchanges) {
      getIdols();
    }
  }, [products, exchanges]);

  useEffect(() => {
    if (idols && idols.length > 0) {
      loadIdolProducts();
    }
  }, [idols]);

  useEffect(() => {
    // console.log("recommendedProducts: ", recommendedProducts);
    if (recommendedProducts && recommendedProducts.length < 6) {
      //   console.log("random");
      loadRandomProducts(recommendedProducts.length);
    }
  }, [recommendedProducts]);

  return (
    <Container>
      <Text>팬도리를 위한 추천상품 🎁</Text>

      <ProductsDiv>
        {!recommendedProducts ? (
          <Loading size={"100px"} />
        ) : (
          recommendedProducts.map((product) => (
            <ProductBox key={product.id}>
              <ProductImg
                src={product.images[0]}
                onClick={() => onClick(product)}
              />
            </ProductBox>
          ))
        )}
      </ProductsDiv>
    </Container>
  );
};

export default RecommendedProducts;

const Container = styled.div`
  //   background-color: orange;
  margin-top: 50px;
  padding: 0 100px;
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: ${colors.COLOR_MAIN};
`;

const ProductsDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 30px auto 200px;
`;

const ProductBox = styled.div`
  //   background-color: orange;
  width: calc(100% / 6 - 20px);
  margin: 0 10px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;
