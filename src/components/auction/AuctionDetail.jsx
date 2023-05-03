import React, {useEffect} from "react";

import { colors } from "../../common/color";
import styled from "styled-components";
import ProductDetailInfo from "../common/ProductDetailInfo";
import ProductOwnerInfo from "../common/ProductOwnerInfo";
import { authService } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

import { db } from "../../config/firebase";

function deleteDocument(docId) {
  const confirmDelete = window.confirm("삭제하시겠습니까?");

  const productDB = db.collection("product");

  if (confirmDelete) {
    productDB.doc(docId).delete()
      .then(() => {
        console.log("문서가 삭제되었습니다.");
      })
      .catch((error) => {
        console.error("삭제 중 에러가 발생했습니다.", error);
      });
  }
}


const AuctionDetail = ({ product }) => {
  //작성자와 현재 로그인한 사용자가 일치하는지 확인하기 위함
  const user = authService.currentUser;
  const navigate = useNavigate();
  const goModifyPage = () =>{
    navigate(`./modify`)
  };

  useEffect(() => {
    if (!user) {
      alert('로그인을 먼저 해주세요.');
      navigate(-1);
    };
  })
  

  const handleDelete = () =>{
    deleteDocument(product.id);
    navigate(-1);
  }
  return (
    
    <Container>

      <div>
          {user && product.uid === user.uid && 
          <button data={product} onClick={goModifyPage}>edit</button>}
          {user && product.uid === user.uid && <button onClick={handleDelete}>delete</button>}
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
