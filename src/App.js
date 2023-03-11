import React, { useEffect } from "react";

import "./App.css";
import { Reset } from "styled-reset";
import styled from "styled-components";
import { colors } from "./config/color";

// firestore 데이터 베이스
import { db } from "./config/firebase";

// components
import Header from "./components/header/Header";
import Footer, { footerHeight } from "./components/footer/Footer";
import NavBar from "./components/nav/NavBar";

const App = () => {
  const test = async () => {
    const product = db.collection("product");

    const ret = await product.doc("6PK3dqb4N85M7LloAYNA").get();

    console.log("ret: ", ret.data());
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <RootLayout className="root-styles">
      {/* 스타일 리셋 */}
      <Reset />

      {/* header */}
      <Header />

      {/* 네비게이션 바 */}
      <NavBar />

      {/* footer */}
      <Footer />
    </RootLayout>
  );
};

export default App;

const RootLayout = styled.div`
  background-color: ${colors.COLOR_MAIN_BACKGROUND};
  padding-bottom: ${footerHeight};
  min-height: calc(100vh - ${footerHeight});
  position: relative;
`;
