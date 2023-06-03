import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../common/color";
import useUser from "../../../hooks/useUser";
import ProductOwner from "../../common/ProductOwner";
import ProductTitle from "../../common/ProductTitle";
import Tag from "../../common/Tag";
import { moneyFormat } from "../../../common/money";
import moment from "moment";
import { timestampToDateFormat } from "../../../common/date";

const TransactionBox = ({ transaction }) => {
  //console.log(transaction);
  const {
    category,
    consumerId,
    id,
    img,
    price,
    productId,
    sellerId,
    title,
    transactionDate,
  } = transaction;

  const navigate = useNavigate();
  const goTransactionDetail = () => {
    navigate(`./${productId}`);
  };
  //   const formatted = moment(
  //     transaction.transaction.transactionDate.toDate()
  //   ).format("L");
  return (
    <Container onClick={goTransactionDetail}>
      <ProductImg src={img[0]} />

      <Wrapper>
        <OwnerWrapper>
          <ProductOwner uid={sellerId} />
          <Date>{timestampToDateFormat(transactionDate)}</Date>
        </OwnerWrapper>

        <ProductTitle title={title} />
        <Tag label="거래 방법" text="경매" />
        <Tag label="거래 가격" text={`${moneyFormat(price)} 원`} />
      </Wrapper>
    </Container>
  );
};

export default TransactionBox;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid ${colors.COLOR_GREEN_BORDER};
  width: max-content;
  cursor: pointer;
  margin: 5px 0;
`;

const ProductImg = styled.img`
  display: inline-block;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  width: 120px;
  height: 120px;
`;

const Wrapper = styled.div`
  margin-left: 10px;
  width: 550px;
`;

const OwnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  //   background-color: orange;
  width: 100%;
  position: relative;
`;
const Date = styled.p`
  font-size: 10px;
  color: ${colors.COLOR_GRAY_TEXT};
  position: absolute;
  top: 0;
  right: 0;
`;

const Money = styled.span``;
