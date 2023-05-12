import React ,{ useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";


// 데이터베이스에 like 저장
export const useAddlike = (userId, productId) => {
   
    const docRef = doc(db, "likes", userId);
    
    const arrayData = useLike(userId);
    
    const newArrayData = [...arrayData, productId ];

    docRef.update({ products: newArrayData });
    
};

// likes 컬렉션에 userId 도큐먼트가 없는 경우 새로운 도큐먼트 생성
export const AddLikeDoc = async (userId) => {
    const docRef = doc(db, "likes", userId);
    await docRef.set({ products: [] });
};



// like 데이터 들고오기
export const useLike = (userId) => {
    const [arrayData, setArrayData] = useState([]);

    const getLike = async() =>{
        try {
            const docRef = doc(db, "likes", userId);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await AddLikeDoc(userId);
            }
            else {
              const data = { ...docSnap.data(), id: docSnap.id };
              setArrayData(data);
            }
          } catch (err) {
            console.log("getLike error: ", err);
          }
    };

    useEffect(() => {
        getLike();
      }, [userId]);
    
    return arrayData;
};



// removeLike 데이터 삭제
export const useRemoveLike = (userId, productId) => {
    const docRef = doc(db, "likes", userId);
    const arrayData = useLike(userId);
    const index = arrayData.indexOf(productId);
    if (index >= 0) {
        const newArrayData = [...arrayData.slice(0, index), 
            ...arrayData.slice(index + 1)];
        docRef.update({ products: newArrayData });
    }
};

export const useIsLike = (userId, productId) =>{
    const docRef = doc(db, "likes", userId);
    const arrayData = useLike(userId);
    const index = arrayData.indexOf(productId);
    if (index>=0) return 1;
    else return 0;

};