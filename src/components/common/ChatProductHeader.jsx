import React, { useState, useRef, useEffect } from 'react';

import {
  db,
  authService,
  storage,
  realTimeDatabase,
} from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

import Bamboo from '../profile/Bamboo';

const ChatProductHeader = ({ productData }) => {
  const [product, setProduct] = useState('');
  const [writerImage, setWriterImage] = useState('');
  const [writerName, setWriterName] = useState('');

  const getProduct = async () => {
    const docRef = doc(db, 'product', productData.id);
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        setProduct(docSnap.data());

        const writerRef = doc(db, 'users', docSnap.data().uid);
        const writerDocSnap = await getDoc(writerRef);
        setWriterName(writerDocSnap.data().userName);

        const writerImageRef = ref(
          storage,
          `profile_image/${docSnap.data().uid}`
        );

        getDownloadURL(writerImageRef).then((url) => {
          setWriterImage(url);
        });
      }
    } catch (err) {
      console.log('AuctionBiddingPage: ', err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'row' }}>
      <div className="product">
        <p>{product.title}</p>
        <p>굿즈 종류 {product.category}</p>
        <p>아이돌 {product.idol}</p>
      </div>
      <div
        className="writer"
        style={{ padding: '10px', display: 'flex', flexDirection: 'row' }}
      >
        <img
          src={writerImage}
          style={{ width: '100px', height: '100px', borderRadius: '100px' }}
        ></img>
        <div style={{ padding: '10px' }}>
          <p>{writerName}</p>
          <Bamboo bamboo={8} />
        </div>
      </div>
    </div>
  );
};

export default ChatProductHeader;
