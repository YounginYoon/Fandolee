import { doc, getDocs , where, query,collection,or } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../config/firebase";

const useTransactions = (id,type) => {
  const [products, setProducts] = useState(null);

  const getProduct = async () => {
    const transactionDB = collection(db, 'transactions');
    try {
        const q = query(
          transactionDB, or(where("consumerId", "==", id),
          where("sellerId","==",id))
          );
        const ret = await getDocs(q);
        const products = ret.docs.map((doc) => ({
            ...doc.data(),
            id:doc.id
        }));
        setProducts(products);

    } catch (err) {
      console.log("useTransactions error: ", err);
    }
  };

  const getExProduct = async () => {
    const transactionDB = collection(db, 'exTransactions');
    try {
        const q = query(
            transactionDB, or(where("consumerId", "==", id),
            where("sellerId","==",id))
          );
        const ret = await getDocs(q);
        const products = ret.docs.map((doc) => ({
            ...doc.data(),
            id:doc.id
        }));
        setProducts(products);

    } catch (err) {
      console.log("useTransactions error: ", err);
    }
  };

  useEffect(() => {
    if (type === "auction"){
      getProduct();
    }
    else{
      getExProduct();
    }
    
  }, [id]);

  return products;
};

export default useTransactions;
