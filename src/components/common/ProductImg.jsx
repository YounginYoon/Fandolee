import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutlined } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { colors } from "../../common/color";
import { remainDate } from "../../common/date";
import {useIsLike, useAddLike ,useRemoveLike, useLike} from "../../hooks/useHeart";
import useUser from "../../hooks/useUser";
import Loading from "../common/Loading";
import { db } from "../../config/firebase";


const ProductImg = ({
  product,
  onClick = null,
  size = "M",
  onHeartClick = () => {
    
    
  },
}) => {
  const user = useUser();
  const { endDate, isComplete } = product;
  const [heart, setHeart] = useState(false);
  const [arrayData, setArrayData] = useState([]);
  
  const arrayDataHook = useLike(user);
  const isLike = useIsLike(product.id, arrayData);
  const productDB = db.collection("likes");
 

  useEffect(()=>{
    setHeart(isLike);
    setArrayData(arrayDataHook);
  },[isLike,arrayDataHook]);

  
  const HandleHeart = async()=> {
    setHeart(!heart);
    //console.log("heart:",heart);
    

    //각 물건의 heart가 다른데 같은 heart로 인식하는 에러 발생..
    if (!heart) {
      if (!arrayData.includes(product.id)) {
        const newArrayData =[...arrayData, product.id ];
        setArrayData(newArrayData);
        await productDB.doc(user.uid).update({ products: newArrayData });
      }
    }
    else{
      if(arrayData.includes(product.id)){
        const index = arrayData.indexOf(product.id);
        const removeArrayData = [...arrayData.slice(0, index), 
          ...arrayData.slice(index + 1)];
        await productDB.doc(user.uid).update({ products: removeArrayData });
      }
    }
    
    
    
  };

  
  

  return (
    <Container>
      <Image src={product.images[0]} onClick={onClick} size={size} />

      <HeartBox onClick={HandleHeart}>
        <FontAwesomeIcon icon={heart ? faHeart : faHeartOutlined} />
      </HeartBox>

      {isComplete ? (
        <Status>{endDate ? "낙찰" : "교환"} 완료</Status>
      ) : endDate && remainDate(endDate) < 0 ? (
        <Status>경매 종료</Status>
      ) : null}
    </Container>
  );
};

export default ProductImg;

export const ImageSizeTable = {
  S: "100px",
  M: "200px",
  L: "300px",
};

const BorderRadisSizeTable = {
  S: "5px",
  M: "10px",
  L: "15px",
};

const Container = styled.div`
  position: relative;
  cursor: pointer;
  width: max-content;
  height: max-content;
  // background-color: orange;
`;

const Image = styled.img`
  width: ${({ size }) => ImageSizeTable[size]};
  height: ${({ size }) => ImageSizeTable[size]};
  border-radius: ${({ size }) => BorderRadisSizeTable[size]};
  object-fit: cover;
  display: inline-block;
`;

const HeartBox = styled.div`
  background-color: rgba(166, 166, 166, 0.5);
  font-size: 22px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 12px;
  bottom: 15px;
  z-index: 10;
  cursor: pointer;
  color: ${colors.COLOR_HEART};
`;

const Status = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
  background-color: ${colors.COLOR_GRAY_BACKGROUND};
  border-radius: 2px;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 10px;
`;
