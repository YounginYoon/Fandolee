import React from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ExchangeList from '../exchange/ExchangeList';
import { useNavigate } from 'react-router-dom';

const RecommendedProducts = () => {
  const productRef = query(collection(db, 'product'));
  const exchangeRef = query(collection(db, 'exchange'));
  // 모든 경매 상품 담음
  const [products, setProducts] = useState([]);
  // 모든 교환 상품 담음
  const [exchange, setExchange] = useState([]);
  //경매 랜덤 추천 상품 담음
  const [recommendProducts, setRecommendProducts] = useState([]);
  //교환 랜덤 추천 상품 담음
  const [recommendExchange, setRecommendExchange] = useState([]);

  const navigate = useNavigate();

  // 모든 경매 상품 가져옴
  const getAllProducts = async () => {
    const productDocs = await getDocs(productRef);
    const productsList = [];
    await productDocs.forEach((doc) => {
      const data = doc.data();
      if (data.isComplete === 0) productsList.push({ id: doc.id, data });
    });

    setProducts(productsList);
  };

  //모든 교환 상품 가져옴
  const getAllExchange = async () => {
    const exchangeDocs = await getDocs(exchangeRef);
    const productsList = [];
    await exchangeDocs.forEach((doc) => {
      const data = doc.data();
      if (data.isComplete === 0) productsList.push({ id: doc.id, data });
    });

    setExchange(productsList);
  };

  const randomRecommend = (list, setRecommend) => {
    const shuffled = list.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3); // 랜덤으로 3개 뽑기
    setRecommend(selected);
  };

  const goAuctionProduct = (productId) => {
    navigate(`/auction/auctiondetail/${productId}`);
  };

  const goExchangeProduct = (productId) => {
    navigate(`/exchange/exchangedetail/${productId}`);
  };

  useEffect(() => {
    getAllProducts();
    getAllExchange();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      randomRecommend(products, setRecommendProducts);
    }
    if (exchange.length > 0) {
      randomRecommend(exchange, setRecommendExchange);
      console.log(recommendExchange);
    }
  }, [products, exchange]);

  return (
    <Container>
      <Text>팬도리를 위한 추천상품 🎁</Text>

      <ProductsDiv>
        {recommendProducts.map((product) => (
          <ProductBox key={product.id}>
            <ProductImg
              src={product.data.images[0]}
              onClick={() => goAuctionProduct(product.id)}
            />
          </ProductBox>
        ))}
        {recommendExchange.map((product) => (
          <ProductBox key={product.id}>
            <ProductImg
              src={product.data.images[0]}
              onClick={() => goExchangeProduct(product.id)}
            />
          </ProductBox>
        ))}
        {/* <ProductBox>
          <ProductImg src="/img/goods1.jpeg" />
        </ProductBox>

        <ProductBox>
          <ProductImg src="/img/goods2.jpeg" />
        </ProductBox>

        <ProductBox>
          <ProductImg src="/img/goods3.jpeg" />
        </ProductBox>

        <ProductBox>
          <ProductImg src="/img/goods4.jpeg" />
        </ProductBox>

        <ProductBox>
          <ProductImg src="/img/goods5.jpeg" />
        </ProductBox>

        <ProductBox>
          <ProductImg src="/img/goods6.jpeg" />
        </ProductBox> */}
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
