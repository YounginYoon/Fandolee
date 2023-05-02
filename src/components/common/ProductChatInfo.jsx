import React from 'react';

import styled from 'styled-components';
import { db, storage } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

import useUser from '../../hooks/useUser';
import { useState, useEffect } from 'react';

import CompleteButton from './CompleteButton';

const ProductChatInfo = ({ productData, postingMode }) => {
  const [product, setProduct] = useState(null);
  const user = useUser();

  const getProduct = async () => {
    const docRef = doc(db, 'product', productData.id);
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        setProduct(docSnap.data());
        //console.log(docSnap.data());
      }
    } catch (err) {
      console.log('ProductChatInfo: ', err);
    }
  };

  useEffect(() => {
    getProduct();
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ width: '300px', border: 'solid blue 1px' }}>
        <div>
          /*
          <img
            src={product.image}
            style={{ width: '200px', height: '200px', borderRadius: '10px' }}
          ></img>
          */
        </div>
        {user.uid === product.uid ? (
          <CompleteButton postingMode={postingMode} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ProductChatInfo;
