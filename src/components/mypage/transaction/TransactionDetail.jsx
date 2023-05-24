import React from "react";
import styled from "styled-components";
import { colors } from "../../../common/color";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import TransactionInfoBox from "./TransactionInfoBox";

const TransactionDetail = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <IconDiv onClick={() => navigate("../transaction")}>
        <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faList} />
        목록
      </IconDiv>

      <InfoDiv>
        <TransactionInfoBox label="굿즈" image={"/img/mon1.jpeg"} />

        <TransactionInfoBox label="아이돌" text="몬스타엑스" />
        <TransactionInfoBox label="판매자" text="김서강" />
        <TransactionInfoBox label="거래 방법" text="경매" />
        <TransactionInfoBox label="낙찰 금액" text="30,000 원" />
        <TransactionInfoBox label="낙찰자" text="이서강" />
        <TransactionInfoBox label="낙찰일" text="2023-06-20" />
        <TransactionInfoBox label="거래일" text="2023-06-20" />
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
