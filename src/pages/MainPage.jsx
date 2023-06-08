import React from "react";
import HomeBanner from "../components/home/HomeBanner";
import RecommendedProducts from "../components/home/RecommendedProducts";

import styled from "styled-components";
import { colors } from "../common/color";
import useUser from "../hooks/useUser";
import RandomProducts from "../components/home/RandomProducts";

const MainPage = () => {
  const user = useUser();

  return (
    <>
      <HomeBanner />

      <Container>
        <Text>
          {user ? user.displayName + "님을" : "팬도리를"} 위한 추천상품 🎁
        </Text>

        <ProductsDiv>
          {user ? <RecommendedProducts /> : <RandomProducts />}
        </ProductsDiv>
      </Container>
    </>
  );
};

export default MainPage;

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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 30px auto 200px;
  // background-color: aqua;
`;
