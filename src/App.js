import React, { useEffect } from "react";

import "./App.css";
import { Reset } from "styled-reset";
import styled from "styled-components";
import { colors } from "./common/color";

// firestore 데이터 베이스
import { db } from "./config/firebase";
import { Route, Routes } from "react-router-dom";

// components
import Header from "./components/header/Header";
import Footer, { footerHeight } from "./components/footer/Footer";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainLayout from "./layouts/MainLayout";
import SubLayout from "./layouts/SubLayout";
import ProfilePage from "./pages/ProfilePage";
import AuctionListPage from "./pages/AuctionListPage";
import AuctionUpPage from "./pages/AuctionUpPage";
import UserPage from "./pages/UserPage";
import MyPage from "./pages/MyPage";

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

      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* 메인 홈 페이지 */}
          <Route path="" element={<MainPage />} />
          {/* 프로필 페이지 */}
          <Route path="profile/:userId" element={<ProfilePage />} />
          {/* 유저 페이지 */}
          <Route path="user/:userId" element={<UserPage />} />
          {/* 마이 페이지 */}
          <Route path="mypage/:userId" element={<MyPage />} />
        </Route>

        <Route path="/user" element={<SubLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>

        <Route path="/auction" element={<MainLayout />}>
          {/*경매 게시글 나열 페이지*/}
          <Route path="auctionUp" element={<AuctionUpPage />} />
          <Route path="auctionlist" element={<AuctionListPage />} />
        </Route>
      </Routes>

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
  min-width: 800px;
`;
