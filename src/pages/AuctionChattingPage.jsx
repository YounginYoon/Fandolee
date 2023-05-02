import React from "react";
import { useSearchParams } from "react-router-dom";
import ChattingHeader from "../components/chat/ChattingHeader";
import Loading from "../components/common/Loading";
import useProduct from "../hooks/useProduct";

const AuctionChattingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const auctionId = searchParams.get("aid");
  const chattingId = searchParams.get("cid");
  //   console.log({ auctionId, chattingId });

  const product = useProduct(auctionId);

  if (!product) {
    return <Loading />;
  }

  return (
    <>
      <ChattingHeader product={product} />
    </>
  );
};

export default AuctionChattingPage;
