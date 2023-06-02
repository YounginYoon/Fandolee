import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../../common/color";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import TransactionInfoBox from "./TransactionInfoBox";
import useProduct from "../../../hooks/useProduct";
import moment from "moment";
import Loading from "../../common/Loading";
import nickName from "../../../hooks/nickName";
import useUser from "../../../hooks/useUser";

const TransactionDetail = () => {
  const navigate = useNavigate();

  const params = useParams();
  const user = useUser();
  const id = params.id;

  const product = useProduct(id);

  const [seller, setSeller] = useState("");

  const setData = async () => {
    const nickname = await nickName(product.uid);
    return nickname;
  };

  const showNickName = () => {
    const seller2 = setData();
    seller2.then((id) => {
      setSeller(id);
    });
  };

  useEffect(() => {
    showNickName();
  }, []);

  if (!product) {
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
        <TransactionInfoBox label="아이돌" text={product.idol} />
        <TransactionInfoBox label="판매자" text={seller} />
        <TransactionInfoBox label="낙찰 금액" text={product.biddingPrice} />
        <TransactionInfoBox label="낙찰자" text={user.displayName} />
        <TransactionInfoBox
          label="낙찰일"
          text={moment(product.biddingDate.toDate()).format("L")}
        />
      </InfoDiv>
    </Container>
  );
};

export default TransactionDetail;

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
