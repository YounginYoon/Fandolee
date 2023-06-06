
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import { db } from '../../config/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  limit,
  orderBy,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ExchangeList from '../exchange/ExchangeList';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { useLike } from '../../hooks/useHeart';
import { useLikeExchange } from '../../hooks/useHeartExchange';
import useProducts from '../../hooks/useProducts';
import useExchanges from '../../hooks/useExchanges';
import Loading from '../common/Loading';

const RecommendedProducts = () => {
  const user = useUser();
  // 사용자가 찜한 경매, 교환 상품 가져오기
  const arrayDataAuction = useLike(user);
  const arrayDataExchange = useLikeExchange(user);
  const products = useProducts(arrayDataAuction);
  const exchanges = useExchanges(arrayDataExchange);

  const [idol, setIdol] = useState([]);
  const [recommendProducts, setRecommendProducts] = useState([]);

  const getIdol = async () => {
    const idols = [];
    if (products) {
      await products.map((product, index) => {
        idols.push(product.idol);
      });
    }
    if (exchanges) {
      await exchanges.map((product, index) => {
        if (product.idol !== '') idols.push(product.idol);
      });
    }
    // 중복 아이돌 지움
    const removeEqual = await idols.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    setIdol(removeEqual);
  };

  const loadIdolProducts = async () => {
    try {
      const productRef = collection(db, 'product');
      const exchangeRef = collection(db, 'exchange');
      const q = query(
        productRef,
        where('idol', 'in', idol),
        where('isComplete', '==', 0),
        limit(4)
      );
      const eq = query(
        exchangeRef,
        where('idol', 'in', idol),
        where('isComplete', '==', 0),
        limit(4)
      );

      const productDocs = await getDocs(q);
      const exchangeDocs = await getDocs(eq);
      const productData = productDocs.docs.map((doc) => doc.data());
      const exchangeData = exchangeDocs.docs.map((doc) => doc.data());
      const combineData = productData.concat(exchangeData);
      await setRecommendProducts(combineData);
      recommendProducts.sort((a, b) => b.likes - a.likes);
    } catch (err) {
      console.log('loadIdolProducts err: ', err);
    }
  };

  const loadRandomProducts = async (len) => {
    try {
      const productRef = collection(db, 'product');
      const exchangeRef = collection(db, 'exchange');
      const q = query(productRef, where('isComplete', '==', 0), limit(6 - len));
      const eq = query(
        exchangeRef,
        where('isComplete', '==', 0),
        limit(6 - len)
      );
      const productDocs = await getDocs(q);
      const exchangeDocs = await getDocs(eq);
      const productData = productDocs.docs.map((doc) => doc.data());
      const exchangeData = exchangeDocs.docs.map((doc) => doc.data());
      const combineData = productData.concat(exchangeData);
      await setRecommendProducts([...recommendProducts, combineData]);
      recommendProducts.sort((a, b) => b.likes - a.likes);
    } catch (err) {
      console.log('loadRandomProducts err: ', err);
    }
  };

  useEffect(() => {
    // getIdol();
    if (idol.length > 0) {
      loadIdolProducts();
    }
    if (recommendProducts.length < 6) {
      loadRandomProducts(recommendProducts.length);
    }
  }, [idol]);

  useEffect(() => {
    if (products && exchanges) {
      getIdol();
    }
  }, [products, exchanges]);

  const showRecommend = recommendProducts.slice(0, 6);

  if (!showRecommend) {
    return <Loading />;
  }

  return (
    <Container>
      <Text>팬도리를 위한 추천상품 🎁</Text>

      <ProductsDiv></ProductsDiv>
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
  //   width: 200px;
  //   height: 250px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;

const OwnerDiv = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 10px;
`;

const OwnerProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${colors.COLOR_DARKGRAY_BACKGROUND};
  margin-right: 10px;
`;

const OwnerName = styled.span`
  font-size: 16px;
  color: ${colors.COLOR_GRAY_TEXT};
  flex-shirink: 1;
`;

const ProductTitle = styled.p`
  font-weight: bold;
`;
