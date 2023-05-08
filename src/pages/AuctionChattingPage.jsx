import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ChattingHeader from "../components/chat/ChattingHeader";
import ChattingInfo from "../components/chat/ChattingInfo";
import Loading from "../components/common/Loading";
import Tag from "../components/common/Tag";
import useProduct from "../hooks/useProduct";
import { moneyFormat } from "../common/money";
import { timestampToDateFormat } from "../common/date";
import { colors } from "../common/color";
import ChattingRoom from "../components/chat/ChattingRoom";
import { useState } from "react";

const AuctionChattingPage = () => {
  const params = useParams();
  const productId = params.id;

  const product = useProduct(productId);

  // 낙찰 완료하기 버튼 클릭 이벤트 콜백
  const onBtnClick = () => {};

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
