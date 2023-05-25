import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ChattingHeader from "../components/chat/ChattingHeader";
import ChattingInfo from "../components/chat/ChattingInfo";
import Loading from "../components/common/Loading";
import Tag from "../components/common/Tag";
import useProduct from "../hooks/useProduct";
import { moneyFormat } from "../common/money";
import { remainDate, timestampToDateFormat } from "../common/date";
import { colors } from "../common/color";
import ChattingRoom from "../components/chat/ChattingRoom";
import { useState } from "react";
import { realTimeDatabase, db } from "../config/firebase";
import useUser from "../hooks/useUser";
import AuctionModal from "../components/auction/AuctionModal";

const AuctionChattingPage = () => {
  const params = useParams();
  const productId = params.id;
  const user = useUser();
  const [product, setProduct] = useState(null);
  const productRef = db.collection("product").doc(productId);
  //모달 띄우기
  const [showAuctionModal, setShowAuctionModal] = useState(false);

  const navigate = useNavigate();

  const loadProduct = async () => {
    try {
      const snapshot = await productRef.get();
      const data = snapshot.data();
      setProduct({ ...data, id: snapshot.id });
    } catch (err) {
      console.log("loadProduct err: ", err);
    }
  };

  // 낙찰 완료하기 버튼 클릭 이벤트 콜백
  const onBtnClick = async () => {
    if (!window.confirm("낙찰을 완료하시겠습니까?")) {
      return;
    }
    try {
      await productRef.update({ isComplete: 1 });
      loadProduct();
    } catch (err) {
      console.log("onBtnClick error: ", err);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    if (product && product.isComplete) {
      loadProduct();
      if (user.uid === product.bidder || user.uid === product.uid) {
        setShowAuctionModal(true);
      } else {
        setShowAuctionModal(false);
      }
    }
  }, [product]);

  if (!product) {
    return <Loading />;
  }

  return (
    <>
      <ChattingHeader product={product} />
      <Wrapper>
        <ChattingInfo
          product={product}
          btnText="낙찰 완료하기"
          onBtnClick={onBtnClick}
        >
          <Tag
            label="경매가"
            text={`${moneyFormat(product.minPrice)} ~ ${moneyFormat(
              product.maxPrice
            )} 원`}
            textColor={colors.COLOR_MAIN}
          />
          <Tag
            label="낙찰 예정일"
            text={timestampToDateFormat(product.endDate)}
            textColor={colors.COLOR_MAIN}
          />
        </ChattingInfo>
        {showAuctionModal && <AuctionModal product={product} />}
        <ChattingRoom product={product} />
      </Wrapper>
    </>
  );
};

export default AuctionChattingPage;

const Wrapper = styled.div`
  //   background-color: whitesmoke;
  margin: 50px auto 300px;
  width: max-content;
  display: flex;
`;
