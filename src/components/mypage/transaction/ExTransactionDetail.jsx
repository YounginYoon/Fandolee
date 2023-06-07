import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../../common/color";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import TransactionInfoBox from "./TransactionInfoBox";
import Loading from "../../common/Loading";
import nickName from "../../../hooks/nickName";
import useUser from "../../../hooks/useUser";
import useExchange from "../../../hooks/useExchange";

const ExTransactionDetail = () => {
  const navigate = useNavigate();

  const params = useParams();
  const user = useUser();
  const id = params.id;

  const product = useExchange(id);

  const [seller, setSeller] = useState("");
  const [consumer, setConsumer] = useState("");

  const setData = async (product) => {
    if (product) {
      const nickname = await nickName(product.uid);
      return nickname;
    } else {
      return null;
    }
  };
  const setData2 = async (product) => {
    if (product) {
      const nickname = await nickName(product.exchanger);
      return nickname;
    } else {
      return null;
    }
  };

  const showNickName = () => {
    const seller2 = setData(product);
    const consumer2 = setData2(product);
    if (seller2) {
      seller2.then((id) => {
        setSeller(id);
        //console.log("seller: ",id);
      });
    }
    if (consumer2) {
      consumer2.then((id) => {
        //console.log("consumer: ",id);
        setConsumer(id);
      });
    }
  };

  useEffect(() => {
    showNickName();
  }, [product]);

  if (!product || !seller || !consumer) {
    return <Loading />;
  }

  return (
    <Container>
      <IconDiv onClick={() => navigate("../transaction")}>
        <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faList} />
        목록
      </IconDiv>

      <InfoDiv>
        <TransactionInfoBox label="굿즈" image={product.images[0]} />
        <TransactionInfoBox label="제목" text={product.title} />
        <TransactionInfoBox label="아이돌" text={product.idol} />
        <TransactionInfoBox label="굿즈종류" text={product.category} />
        <TransactionInfoBox label="거래유형" text={"교환"} />
        <TransactionInfoBox label="게시자" text={seller} />
        <TransactionInfoBox label="거래자" text={consumer} />
        <TransactionInfoBox label="보유멤버" text={product.haveMember} />
        <TransactionInfoBox label="교환멤버" text={product.wantMember} />
        <TransactionInfoBox label="지역" text={product.region} />
        <TransactionInfoBox label="교환방법" text={product.transactionType} />
      </InfoDiv>
    </Container>
  );
};

export default ExTransactionDetail;

const Container = styled.div`
  margin: 70px 0;
  width: 600px;
  //   background-color: orange;
`;

const IconDiv = styled.div`
  color: ${colors.COLOR_GRAY_TEXT};
  font-size: 14px;
  //   background-color: aqua;
  width: max-content;
  cursor: pointer;
`;

const InfoDiv = styled.div`
  //   background-color: orange;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  box-sizing: border-box;
`;
