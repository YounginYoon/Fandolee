import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../common/color";
import useUser from "../../../hooks/useUser";
import ProductOwner from "../../common/ProductOwner";
import ProductTitle from "../../common/ProductTitle";
import Tag from "../../common/Tag";

const ExTransactionBox = ({ transaction }) => {
  // console.log(transaction);
  const {
    category,
    consumerId,
    haveMember,
    id,
    img,
    productId,
    sellerId,
    title,
    wantMember,
  } = transaction;

  const navigate = useNavigate();
  const goTransactionDetail = () => {
    navigate(`./exchange/${productId}`);
  };

  return (
    <Container onClick={goTransactionDetail}>
      <ProductImg src={img[0]} />

      <Wrapper>
        <OwnerWrapper>
          <ProductOwner uid={sellerId} />
        </OwnerWrapper>

        <ProductTitle title={title} />
        <Tag label="거래 방법" text="교환" />
      </Wrapper>
    </Container>
  );
};

export default ExTransactionBox;

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
`;
const Date = styled.p`
  font-size: 10px;
  color: ${colors.COLOR_GRAY_TEXT};
  width: max-content;
`;

const Money = styled.span``;
