import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useOutlet, useParams } from "react-router-dom";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import AuctionList from "../components/auction/AuctionList";
import Loading from "../components/common/Loading";
import ExchangeList from "../components/exchange/ExchangeList";

import UserHeader from "../components/user/UserHeader";
import UserNav from "../components/user/UserNav";
import { db } from "../config/firebase";

import { taps } from "../constants/tap";
import useOwner from "../hooks/useOwner";
import useUser from "../hooks/useUser";
import { colors } from "../common/color";

const UserPage = () => {
  const user = useUser();
  const params = useParams();

  const [owner, profileImage] = useOwner(params.uid);

  const [isAdmin, setIsAdmin] = useState(false);
  const [currentTab, setCurrentTab] = useState(taps.auction);
  const [auctions, setAuctions] = useState(null);
  const [exchanges, setExchanges] = useState(null);

  const navigate = useNavigate();

  const getAuctionList = async () => {
    const productRef = collection(db, "product");
    try {
      const q = query(productRef, where("uid", "==", params.uid));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // console.log("data: ", data);
      setAuctions(data);
    } catch (err) {
      console.log("user page getAuctionList error: ", err);
    }
  };
  const getExchangeList = async () => {
    const exchangeRef = collection(db, "exchange");

    try {
      const q = query(exchangeRef, where("uid", "==", params.uid));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setExchanges(data);
    } catch (err) {
      console.log("user page getExchangeList err: ", err);
    }
  };

  const goPostPage = () => {
    if (currentTab === taps.auction) {
      navigate("/auction/post");
    } else {
      navigate("/exchange/post");
    }
  };

  useEffect(() => {
    getAuctionList();
    getExchangeList();

    if (user.uid === params.uid) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user, params]);

  if (!owner || !profileImage || !auctions || !exchanges) {
    return <Loading />;
  }

  return (
    <Container>
      <UserHeader owner={owner} profileImage={profileImage} isAdmin={isAdmin} />

      <UserNav currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <ListWrapper>
        {isAdmin && (
          <PostBtn onClick={goPostPage}>
            글 올리기{" "}
            <FontAwesomeIcon style={{ marginLeft: "5px" }} icon={faPen} />
          </PostBtn>
        )}

        {currentTab === taps.auction ? (
          <AuctionList products={auctions} />
        ) : currentTab === taps.exchange ? (
          <ExchangeList products={exchanges} />
        ) : null}
      </ListWrapper>
    </Container>
  );
};

export default UserPage;

const Container = styled.div``;

const ListWrapper = styled.div`
  width: max-content;
  margin: 0 auto;
  position: relative;
  // background-color: orange;
`;

const PostBtn = styled.div`
  position: absolute;
  right: 0;
  top: -35px;
  padding: 0 15px;
  width: max-content;
  font-size: 14px;
  height: 30px;
  // box-shadow: 3px 7px 7px 0 rgba(176, 176, 176, 0.5);
  border-radius: 5px;
  cursor: pointer;
  background-color: ${colors.COLOR_MAIN};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
