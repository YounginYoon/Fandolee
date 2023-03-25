import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { colors } from '../config/color';
import { doc } from 'firebase/firestore';
import { db,  storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import moment from 'moment';

insert_dt : moment().format('YYYY-MM-DD hh:mm:ss')




const AuctionUpPage = () => {

  
  const navigate = useNavigate();
  const [input, setInputs] = useState({
    
    minPrice: 0,
    maxPrice: 0,
    info: '',
    image:'',
    
    title:'',
    subtitle:'',
    likes:0

  });
  
  const selectList = ["BTS", "SKZ", "SVT", "NCT DREAM","Black Pink"];
  const categoryList = ["Albums", "MD", "Tickets", "ETC"];
  // const handleClickFileInput = () => {
  //   fileInputRef.current?.click();
  // };
  const [Selected, setSelected] = useState("");
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const [Category, setCategory] = useState("");
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  //이미지 업로드
  // const fileInputRef = useRef(null);
  // const [imageUpload, setImageUpload] = useState('');
  // const uploadImage = (e)=>{
  //   setImageUpload(e.target.files?.[0]);
  // };

  const addPost = async () => {
    const postDB = db.collection('product')
    try{

      var post_info = {
        
        minPrice: input.minPrice,
        maxPrice: input.maxPrice,
        info: input.info,
        idol: Selected,
        
        image:'',
        
        category: Category,
        title: input.title,
        subtitle:input.subtitle,
        likes: 0,
        date : moment().format('YYYY-MM-DD hh:mm:ss')
      };

      
      const user_info = {
          user_id: JSON.parse( sessionStorage.getItem('user') ).uid
      }
      
      postDB.add({...post_info,...user_info}).then((doc) =>{
        console.log(doc);

      }).catch((err) =>{  // 실패했을 때
          console.log('작성 실패', err)
      })

    } catch(err){
      console.log('posting error', err);

    }
    
  }



  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    
  };

    
    


  return (
    <div>
      

      <div>
      <input onChange={onChange} value={input.title} name="title" placeholder="상품명 입력(30자 이내)"/>
        <select onChange={handleSelect} value={Selected} placeholder="아이돌그룹">
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <select onChange={handleCategory} value={Category} placeholder="카테고리">
          {categoryList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        
        
        
        <input onChange={onChange} value={input.subtitle} name="subtitle" placeholder="부제 작성 (굿즈 종류, 그룹명, 멤버명 순)"  />
        <label>상품 설명</label>
        <textarea  onChange={onChange} value={input.info} name="info" placeholder="상품 설명 입력 (150자 이내)"  />
        <input  type="number" onChange={onChange} value={input.minPrice} name="minPrice" placeholder="최소 금액"  />
        <input  type="number" onChange={onChange} value={input.maxPrice} name="maxPrice" placeholder="최대 금액"  />

        {/* <EditBox onClick={handleClickFileInput}>대표 사진 고르기</EditBox>
        
        <input
          name="image"
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          ref={fileInputRef}
          onChange={uploadImage}
          style={{ display: 'none' }}
        />  */}
        <button onClick={addPost}>업로드</button>
      </div>
    </div>
    
    

    
  );
  

};



export default AuctionUpPage;


const EditBox = styled.div`
  cursor: pointer;
  color: ${colors.COLOR_WHITE_TEXT};
  background-color: ${colors.COLOR_GRAY_BACKGROUND};
  line-height: 40px;
  border-radius: 8px;
  text-align: center;
  margin-top: 20px;
`;