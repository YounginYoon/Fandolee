import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../config/firebase";

const useProducts = (arrayId) => {
  const [products, setProducts] = useState(null);

  const getProduct = async(arrayId) => {
    for(let i=0; i<arrayId.length; i++){
        try {
            const docRef = doc(db, "product", arrayId[i]);
            const docSnap = await getDoc(docRef);
      
            if (docSnap.exists()) {
                if(products){
                    const updateProducts = [...products, ...docSnap.data()];
                    setProducts(updateProducts);
                    console.log(updateProducts);

                }
                else{
                    setProducts([docSnap.data()])
                }

              
            }
          } catch (err) {
            console.log("useProduct error: ", err);
          }
    }

    
  };

  useEffect(() => {
    getProduct(arrayId);
    
  }, [arrayId]);

  return products;
};

export default useProducts;
