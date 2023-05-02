import React from "react";

import { colors } from "../../common/color";
import styled from "styled-components";
import ProductDetailInfo from "../common/ProductDetailInfo";
import ProductOwnerInfo from "../common/ProductOwnerInfo";

import { authService } from "../../config/firebase";

const AuctionDetail = ({ product }) => {

  const user = authService.currentUser;
  

  return (
    
    <Container>

      <div>
          {product.uid === user.uid && <button>edit</button>}
      </div>
      <ProductDetailInfo product={product} />

      <ProductOwnerInfo uid={product.uid} />

      <InfoDiv>
        <DetailTitle>경매 참여 방법</DetailTitle>

        <DetailInfo>
          <Highlight>경매 참여</Highlight> 버튼 클릭 후<br />
          경매 채팅에서 <Highlight>투찰가</Highlight>를 입력하여 경매에
          참여하세요!
        </DetailInfo>
      </InfoDiv>
    </Container>
  );
};

export default AuctionDetail;

const Container = styled.div`
  //   background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 300px;
`;

const InfoDiv = styled.div`
  margin: 100px 0;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailTitle = styled.p`
  font-weight: bold;
  font-size: 22px;
  color: ${colors.COLOR_MAIN};
  margin-bottom: 60px;
`;

const DetailInfo = styled.p`
  margin-top: 40px;
  line-height: 32px;
  text-align: center;
`;

const Highlight = styled.span`
  font-weight: bold;
  font-size: 18px;
`;
