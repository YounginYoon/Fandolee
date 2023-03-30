import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";

const TransactionHistory = () => {
  return (
    <Container>
      <Text>거래내역</Text>

      <ScrollDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
        <TransactionDiv>
          <TransactionText>[몬스타엑스] REASON 미개봉 앨범</TransactionText>
        </TransactionDiv>
      </ScrollDiv>
    </Container>
  );
};

export default TransactionHistory;

const Container = styled.div`
  margin-top: 70px;
`;

const Text = styled.p`
  font-size: 22px;
  font-weight: bold;
`;

const ScrollDiv = styled.div`
  margin-top: 20px;
  padding-right: 50px;
  width: 400px;
  height: 400px;
  overflow: auto;
  //   background-color: orange;
`;

const TransactionDiv = styled.div`
  width: 100%;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  border-radius: 8px;
  padding: 5px 15px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 7px;
  cursor: pointer;
`;

const TransactionText = styled.span`
  line-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
