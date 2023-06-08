import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import ReactModal from "react-modal";
import { useState } from "react";
import useOwner from "../../hooks/useOwner";
import useProduct from "../../hooks/useProduct";
import Loading from "../common/Loading";
import { colors } from "../../common/color";
import { moneyFormat } from "../../common/money";
import { db } from "../../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { MyTab } from "../../constants/mypage";
import useUser from "../../hooks/useUser";

const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const BambooModal = ({ product, type }) => {
  const navigate = useNavigate();
  const productId = product.id;
  //모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  //판매자
  const [owner, profileImage] = useOwner(product.uid);
  //밤부 점수 select
  const [select, setSelect] = useState(0);
  const user = useUser();

  // 모달 open and close
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  ////

  const updateBamboo = async () => {
    const bambooRef = doc(db, "bamboo", product.uid);
    const docSnap = await getDoc(bambooRef);
    const auctionDB = db.collection("transactions");
    const exchangeDB = db.collection("exTransactions");
    //product / exchange collection에 업데이트하기 위한 ref
    const dbRef =
      type === "auction"
        ? doc(db, "product", product.id)
        : type === "exchange"
        ? doc(db, "exchange", product.id)
        : null;
    const productDoc = await getDoc(dbRef);

    const body =
      type === "auction"
        ? {
            productId: product.id,
            sellerId: product.uid,
            consumerId: product.bidder,
            transactionDate: product.biddingDate,
            title: product.title,
            price: product.biddingPrice,
            img: product.images,
            category: product.category,
          }
        : type === "exchange"
        ? {
            productId: product.id,
            sellerId: product.uid,
            consumerId: product.exchanger,
            title: product.title,
            img: product.images,
            category: product.category,
            haveMember: product.haveMember,
            wantMember: product.wantMember,
          }
        : null;

    if (docSnap.exists() && productDoc.exists()) {
      const data = docSnap.data();
      const count = data.count + 1;
      const score = data.score + parseInt(select);
      await updateDoc(bambooRef, { score: score, count: count });
      await updateDoc(dbRef, { bambooScore: parseInt(select) }); // product / exchange collection에 업데이트

      if (type == "auction") {
        await auctionDB
          .add({
            ...body,
          })
          .catch((err) => {
            console.log("transactions upload error", err);
          });
      } else {
        await exchangeDB
          .add({
            ...body,
          })
          .catch((err) => {
            console.log("transactions upload error", err);
          });
      }
    } else {
      const input = { score: parseInt(select), count: 1 };
      await setDoc(bambooRef, input);
    }

    await alert("거래가 완료되었습니다!");
    closeModal();

    let path = `${type === "exchange/" ? type : ""}${product.id}`;
    navigate(`/mypage/${user.uid}/${MyTab[3].tab}/${path}`);
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  if (!product) {
    return <Loading />;
  }

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      appElement={document.getElementById("root")}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.35)",
          zIndex: 9999,
        },
        content: {
          margin: "auto",
          width: "max-content",
          height: "max-content",
          padding: "25px",
        },
      }}
    >
      <Container>
        <Image src={profileImage} />
        {owner ? (
          <InfoText>
            <span style={{ color: colors.COLOR_MAIN }}>{owner.nickName} </span>
            님과의 거래는 어떠셨나요?
          </InfoText>
        ) : null}

        <Text>
          <span style={{ color: colors.COLOR_MAIN }}>밤부 점수</span>를
          등록해주세요!
        </Text>

        <ScoreDiv>
          {scores.map((score) => (
            <ScoreBox key={score}>
              <ScoreNum>{score}</ScoreNum>

              <ScoreCircleDiv>
                <ScoreCircle
                  onClick={() => setSelect(score)}
                  score={score}
                  selected={score === select}
                />
              </ScoreCircleDiv>
            </ScoreBox>
          ))}
        </ScoreDiv>

        <BtnDiv>
          <Btn bgColor={colors.COLOR_GRAY_BACKGROUND} onClick={closeModal}>
            닫기
          </Btn>
          <Btn bgColor={colors.COLOR_MAIN} onClick={updateBamboo}>
            거래 확정하기
          </Btn>
        </BtnDiv>
      </Container>
    </ReactModal>
  );
};

export default BambooModal;

const Container = styled.div`
  // background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid ${colors.COLOR_GRAY_BORDER};
`;

const InfoText = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin: 15px 0 30px;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ScoreDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ScoreBox = styled.div`
  // background-color: aqua;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
`;

const ScoreNum = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: ${colors.COLOR_GRAY_TEXT};
`;

const ScoreCircleDiv = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const ScoreCircle = styled.div`
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;

  ${({ selected }) => {
    if (selected) {
      return css`
        background-color: ${colors.COLOR_MAIN};
      `;
    } else {
      return css`
        background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
        &:hover {
          background-color: #a4cd9a;
        }
      `;
    }
  }}

  ${({ score }) => {
    return css`
      width: calc(4% * ${score} + 15px);
      height: calc(4% * ${score} + 15px);
    `;
  }}
`;

const BtnDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
`;

const Btn = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
  font-weight: bold;
  color: white;
  border-radius: 5px;
  width: 180px;
  line-height: 35px;
  text-align: center;
  margin: 0 5px;
`;
