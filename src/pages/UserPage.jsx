import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useOutlet, useParams } from "react-router-dom";

import styled from "styled-components";
import AuctionList from "../components/auction/AuctionList";
import Loading from "../components/common/Loading";

import UserHeader from "../components/user/UserHeader";
import UserNav from "../components/user/UserNav";
import { db } from "../config/firebase";

import { taps } from "../constants/tap";
import useOwner from "../hooks/useOwner";
import useUser from "../hooks/useUser";

const UserPage = () => {
  const user = useUser();
  const params = useParams();

  const [owner, profileImage] = useOwner(params.userId);

  const [isAdmin, setIsAdmin] = useState(false);
  const [currentTab, setCurrentTab] = useState(taps.auction);
  const [auctions, setAuctions] = useState(null);

  const getAuctionList = async () => {
    const productRef = collection(db, "product");
    try {
      const q = query(productRef, where("uid", "==", params.userId));
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

  useEffect(() => {
    getAuctionList();

    if (user.uid === params.userId) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user, params]);

  if (!owner || !profileImage || !auctions) {
    return <Loading />;
  }

  return (
    <Container>
      <UserHeader owner={owner} profileImage={profileImage} isAdmin={isAdmin} />

      <UserNav currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {currentTab === taps.auction ? (
        <AuctionList products={auctions} />
      ) : currentTab === taps.exchange ? (
        <div>exchange tab</div>
      ) : null}
    </Container>
  );
};

export default UserPage;

const Container = styled.div``;
