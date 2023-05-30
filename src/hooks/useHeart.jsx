import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, increment, fieldvalue } from "../config/firebase";
import Loading from "../components/common/Loading";

// 데이터베이스에 like 저장
export const useAddLike = async (userId, productId) => {
  const [arrayData, setArrayData] = useState([]);
  const docRef = doc(db, "likes", userId);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    setArrayData(data.products);
    if (arrayData) {
      const index = arrayData.indexOf(productId);
      if (index < 0) {
        const newArrayData = [...arrayData, productId];
        const productDB = db.collection("likes");
        await productDB.doc(userId).update({ products: newArrayData });
      }
    }
  }
};

// likes 컬렉션에 userId 도큐먼트가 없는 경우 새로운 도큐먼트 생성
export const AddLikeDoc = async (userId) => {
  const productDB = db.collection("likes");
  await productDB.doc(userId).set({ products: [], exchanges: [] });
};

//user의 like products 데이터 읽기
export const useLike = (user) => {
  const [arrayData, setArrayData] = useState([]);

  const getLike = async () => {
    try {
      const docRef = doc(db, "likes", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await AddLikeDoc(user.uid);
      } else {
        const data = docSnap.data();
        setArrayData(data.products);
      }
    } catch (err) {
      console.log("getLike error: ", err);
    }
  };

  useEffect(() => {
    getLike();
  }, []);

  if (!user) {
    return [];
  }

  return arrayData;
};

//user의 like products 데이터 읽기
export const Like2 = async (user) => {
  let arrayData = [];

  if (user) {
    const docRef = doc(db, "likes", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await AddLikeDoc(user.uid);
    } else {
      const data = docSnap.data();
      arrayData = data.products;
    }
  }

  return arrayData;
};

// removeLike 데이터 삭제
export const useRemoveLike = async (userId, productId) => {
  const arrayData = useLike(userId);
  const index = arrayData.indexOf(productId);
  const productDB = db.collection("likes");

  if (index >= 0) {
    const newArrayData = [
      ...arrayData.slice(0, index),
      ...arrayData.slice(index + 1),
    ];
    await productDB.doc(userId).update({ products: newArrayData });
  }
};

export const useIsLike = (productId, arrayData) => {
  if (!arrayData) return null;

  if (arrayData.length) {
    const index = arrayData.indexOf(productId);

    if (index >= 0) return true;
    else return false;
  } else {
    return null;
  }
};

export const useProductLike = async (productId) => {
  const [likes, setLikes] = useState(0);

  const docRef = doc(db, "product", productId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setLikes(docSnap.data().likes);
  }
  return likes;
};

export const plusProductLike = async (productId) => {
  const docRef = db.collection("product").doc(productId);

  if (docRef) await docRef.update({ likes: fieldvalue.increment(1) });
};

export const miusProductLike = async (productId) => {
  const docRef = db.collection("product").doc(productId);

  if (docRef) await docRef.update({ likes: fieldvalue.increment(-1) });
};

