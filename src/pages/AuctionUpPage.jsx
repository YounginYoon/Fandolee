import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { colors } from '../config/color';
import { useSelector } from 'react-redux';
import { doc } from 'firebase/firestore';

import moment from 'moment';

insert_dt : moment().format('YYYY-MM-DD hh:mm:ss')

const LoginRight = (props) =>{
  const is_login = useSelector((state) => state.user.is_login);
  if(!is_login){
    return (
        <Grid margin='100px 0px' padding='16px' center>
            <Text size='24px'>로그인 후에만 작성이 가능합니다</Text>
            <Button 
            _onClick={() => {history.replace('/');}} 
            >로그인 하러가기</Button>
        </Grid>
    )
  }

  
}




const AuctionUpPage = () => {

  
  const navigate = useNavigate();
  const [input, setInputs] = useState({
    id: '',
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    info: '',
    image:'',
    
    title:'',
    subtitle:'',
    likes: PropTypes.number

  });
  const [error, setError] = useState({
    id: '',
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    info: '',
    image:'',
    
    title:'',
    subtitle:'',
    likes: PropTypes.number

  });
  const selectList = ["BTS", "SKZ", "SVT", "NCT DREAM","Black Pink"];
  const categoryList = ["Albums", "MD", "Tickets", "ETC"];

  const [Selected, setSelected] = useState("");
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const [Category, setCategory] = useState("");
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const addPost = async () => {
    const postDB = db.collection('product')
    try{

      var post_info = {
        id: input.id,
        minPrice: input.minPrice,
        maxPrice: input.maxPrice,
        info: input.info,
        idol: Selected,
        member: PropTypes.number,
        image:'',
        
        category: Category,
        title: input.title,
        subtitle:input.subtitle,
        likes: 0
      };

      const user = useUser();
      const user_info = {
          user_id: user.uid
      }
      const _post = {
        // 게시물이 만들어지는 시점 기록
        date : moment().format('YYYY-MM-DD hh:mm:ss')  
      }
      postDB.add({...post_info,...user_info, ..._post}).then((doc) =>{
        console.log(result);

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
        <input onChange={onChange} value={input.title} name="title" placeholder="제목"/>
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
        
        <input onChange={onChange} value={input.title} name="title" placeholder="상품명 입력(30자 이내)"/>
        <label>상품 설명</label>
        <input onChange={onChange} value={input.subtitle} name="subtitle" placeholder="부제 작성 (굿즈 종류, 그룹명, 멤버명 순)"  />
        <input onChange={onChange} value={input.info} name="info" placeholder="상품 설명 입력 (150자 이내)"  />
        <input onChange={onChange} value={input.minPrice} name="minPrice" placeholder="최소 금액"  />
        <input onChange={onChange} value={input.maxPrice} name="maxPrice" placeholder="최대 금액"  />
        
        <label>대표사진 고르기</label>
        
        <button onClick={addPost}>업로드</button>
      </div>
    </div>
    
    

    
  );
  

};



export default AuctionUpPage;