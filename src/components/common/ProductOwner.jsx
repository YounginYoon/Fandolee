import React, { useEffect,  useState } from "react";
import styled from "styled-components";
import { colors } from "../../common/color";
import {  doc ,getDoc } from "firebase/firestore";
import { ref,  getDownloadURL } from "firebase/storage";
import { db , storage } from "../../config/firebase";


const ProductOwner = ({ owner }) => {
  //owner = data.uid 가 들어있음
  
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  
  const PresentNickName = async() => {
    const docRef = doc(db,"users",owner);
    const docSnap = await getDoc(docRef);
  

   try{
      
     //만약 존재하면 콘솔창에 표시.
     if (docSnap.exists()){
       //console.log(docSnap.data().nickName);
       setName(docSnap.data());
     }
    
   }catch(error){
     console.log("productOwner: ",error)
    }

    

  }
  const getImage = async() => {
    
    try {
      const imageRef = ref(storage, `profile_image/${owner}`);
      await getDownloadURL(imageRef).then((x) =>{
        setUrl(x);
        //if (x) console.log('imageUrl:', url);
      })
      
    } catch (e) {
      console.log("Get image err: ",e);
    }
  };
  useEffect(() => {
    //console.log("닉네임표시: ");
    PresentNickName();
    getImage();
  }, []);

  

  return (
    <Container>
      <ProfileImage src={url} />

      <Ninckname>{name.nickName}</Ninckname>
      
    </Container>
  );
};

export default ProductOwner;

const Container = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`;

const Ninckname = styled.p`
  margin-left: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: ${colors.COLOR_DARKGRAY_TEXT};
`;
