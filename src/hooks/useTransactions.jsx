import { doc, getDocs , where, query,collection } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../config/firebase";

const useTransactions = (id) => {
  const [products, setProducts] = useState(null);

  const getProduct = async () => {
    const transactionDB = collection(db, 'transactions');
    try {
        const q = query(
            transactionDB,
            where("consumerId", "==", id)
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
    getProduct();
  }, [id]);

  return products;
};

export default useTransactions;
