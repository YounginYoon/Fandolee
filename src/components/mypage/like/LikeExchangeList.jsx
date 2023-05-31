import React from "react";
import ExchangeContainer from "../../exchange/ExchangeContainer";
import EmptyList from "../EmptyList";

const LikeExchangeList = ({ exchanges }) => {
  return (
    <>
      {exchanges && exchanges.length > 0 ? (
        exchanges.map((product, index) => (
          <ExchangeContainer data={product} key={index} />
        ))
      ) : (
        <EmptyList text="교환 찜 목록 내역이 없습니다." />
      )}
    </>
  );
};

export default LikeExchangeList;
