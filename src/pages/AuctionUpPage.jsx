import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { doc } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import moment from "moment";

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
  ];
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

      // `images === 참조값이름(폴더이름), / 뒤에는 파일이름 어떻게 지을지
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
          };

          const user_info = {
            user_id: JSON.parse(sessionStorage.getItem("user")).uid,
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
        <input
          type="number"
          onChange={onChange}
          value={input.minPrice}
          name="minPrice"
          placeholder="최소 금액"
        />
        <input
          type="number"
          onChange={onChange}
          value={input.maxPrice}
          name="maxPrice"
          placeholder="최대 금액"
        />

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

