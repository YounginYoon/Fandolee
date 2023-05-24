import React from "react";
import styled from "styled-components";
import { colors } from "../../../common/color";

const TransactionInfoBox = ({ label, text, image }) => {
  return (
    <Container>
      <Label>{label}</Label>

      {image ? <ProductImg src={image} /> : <Text>{text}</Text>}
    </Container>
  );
};

export default TransactionInfoBox;

const Container = styled.div`
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  border-radius: 3px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;
const Label = styled.div`
  width: 120px;
  text-align: center;
  color: ${colors.COLOR_LIGHTGRAY_TEXT};
  font-size: 12px;
  box-sizing: border-box;
  margin-right: 15px;
`;

const Text = styled.div`
  font-weight: bold;
  box-sizing: border-box;
  max-width: calc(100% - 130px);
`;

const ProductImg = styled.img`
  display: inline-block;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  border-radius: 5px;
  object-fit: cover;
  width: 200px;
  height: 200px;
`;
