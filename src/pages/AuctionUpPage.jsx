import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { doc } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import moment from "moment";
//달력 추가하기 npm install 해야함
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';

const AuctionUpPage = () => {
  const navigate = useNavigate();
  const [input, setInputs] = useState({
    minPrice: 0,
    maxPrice: 0,
    info: "",
    image: "",
    title: "",
    subtitle: "",
    likes: 0,
  });
  //현재시간
  const timeStamp = moment().format("YYYY-MM-DD hh:mm:ss");

  const selectList = [
    "Your Idol",
    "BTS",
    "SKZ",
    "SVT",
    "NCT DREAM",
    "Black Pink",
    "MONSTA X",
    "NCT 127",
    "IVE",
    "NEW JEANS",
    "NCT",
  ];
  //카테고리리스트

  const categoryList = ["Goods", "Albums", "MD", "Tickets", "Photo Cards"];
  // const handleClickFileInput = () => {
  //   fileInputRef.current?.click();
  // };
  const [Selected, setSelected] = useState("Your Idol");
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const [Category, setCategory] = useState("Goods");
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  //이미지 업로드
  const [imageUpload, setImageUpload] = useState(null);

  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "product_image/");

  //이미지 불러오기
  // useEffect(() => {
  //   listAll(imageListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageList((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);
  
  const addPost = async () => {
    const postDB = db.collection("product");

    try {
      //이미지 upload
      if (imageUpload === null) return;

      const imageRef = ref(
        storage,
        `product_image/${imageUpload.name}${timeStamp}`
      );

      // `images === 참조값이름(폴더이름)
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        // 업로드 되자마자 뜨게 만들기
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);

          var post_info = {
            minPrice: parseInt(input.minPrice),
            maxPrice: parseInt(input.maxPrice),
            info: input.info,
            idol: Selected,
            image: url,
            category: Category,
            title: input.title,
            subtitle: input.subtitle,
            likes: 0,
            date: new Date(),
            end_date:endDate,
          };

          const user_info = {
            uid: JSON.parse(sessionStorage.getItem("user")).uid,
          };

          postDB
            .add({ ...post_info, ...user_info })
            .then((doc) => {
              console.log(doc);
            })
            .catch((err) => {
              // 실패했을 때
              console.log("작성 실패", err);
            });
          //
        });
      });
      //이미지 upload

      navigate(`/auction/auctionlist`);
    } catch (err) {
      console.log("posting error", err);
    }
  };
  //달력 추가하기
  const [endDate, setEndDate] = useState(addDays(new Date() , 1));
  

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
        <input
          onChange={onChange}
          value={input.title}
          name="title"
          placeholder="상품명 입력(30자 이내)"
        />
        <select
          onChange={handleSelect}
          value={Selected}
          placeholder="아이돌그룹"
        >
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          onChange={handleCategory}
          value={Category}
          placeholder="카테고리"
        >
          {categoryList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          onChange={onChange}
          value={input.subtitle}
          name="subtitle"
          placeholder="부제 작성 (굿즈 종류, 그룹명, 멤버명 순)"
        />
        <label>상품 설명</label>
        <textarea
          onChange={onChange}
          value={input.info}
          name="info"
          placeholder="상품 설명 입력 (150자 이내)"
        />
        <label>최소 금액</label>
        <input
          type="number"
          onChange={onChange}
          value={input.minPrice}
          name="minPrice"
          placeholder="최소 금액"
        />
        <label>최대 금액</label>
        <input
          type="number"
          onChange={onChange}
          value={input.maxPrice}
          name="maxPrice"
          placeholder="최대 금액"
        />
        <label>거래 종료 날짜 선택하기</label>
        <DatePicker 
          dateFormat="yyyy년 MM월 dd일"
          selected={endDate} 
          onChange={date => setEndDate(date)} 
          locale={ko}
          minDate={addDays(new Date() , 1)}
        />
        <label>이미지 파일 선택하기</label>
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />

        <button onClick={addPost}>업로드</button>
      </div>
    </div>
  );
};

export default AuctionUpPage;

