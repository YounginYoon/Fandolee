import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../config/firebase";

const useProduct = (id) => {
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const docRef = doc(db, "product", id);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap);
      if (docSnap.exists()) {
        const data = { ...docSnap.data(), id: docSnap.id };
        setProduct(data);
      }
    } catch (err) {
      console.log("useProduct error: ", err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return product;
};

export default useProduct;
