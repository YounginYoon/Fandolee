import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutlined } from "@fortawesome/free-regular-svg-icons";

import {useIsLike, plusProductLike ,miusProductLike, useLike} from "../../hooks/useHeart";
import useUser from "../../hooks/useUser";

import { db } from "../../config/firebase";


const UserHeart = ({
  product,
  onClick = null,
  
}) => {
  const user = useUser();

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
        
    if (!heart) {
      if (!arrayData.includes(product.id)) {
        const newArrayData =[...arrayData, product.id ];
        setArrayData(newArrayData);
        await productDB.doc(user.uid).update({ products: newArrayData });
        plusProductLike(product.id);
      }
    }
    else{
      if(arrayData.includes(product.id)){
        const index = arrayData.indexOf(product.id);
        const removeArrayData = [...arrayData.slice(0, index), 
          ...arrayData.slice(index + 1)];
        await productDB.doc(user.uid).update({ products: removeArrayData });
        miusProductLike(product.id);
      }
    }
    
  };

  
  return (
    <FontAwesomeIcon onClick={HandleHeart} icon={heart ? faHeart : faHeartOutlined} />
  );
};

export default UserHeart;

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


