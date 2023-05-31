import React from "react";
import AuctionContainer from "../../auction/AuctionContainer";
import EmptyList from "../EmptyList";

const LikeAuctionList = ({ products }) => {
  return (
    <>
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <AuctionContainer data={product} key={index} />
        ))
      ) : (
        <EmptyList text="경매 찜 목록 내역이 없습니다." />
      )}
    </>
  );
};

export default LikeAuctionList;
