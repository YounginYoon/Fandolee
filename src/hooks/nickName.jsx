import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../config/firebase";

const NickName = async(id) => {
  
  let nickName = null;

  if (id) {
    const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data().nickName;
      nickName = data;
    } 
  }

  return nickName;

};

export default NickName;
