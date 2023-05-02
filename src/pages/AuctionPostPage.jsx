import React, { useState } from "react";

import styled from "styled-components";

import { IdolList } from "../constants/idol";
import { Category } from "../constants/category";

import PostContainer from "../components/post/PostContainer";
import PostInputBox from "../components/post/PostInputBox";
import PostInputText from "../components/post/PostInputText";
import PostDropDown from "../components/post/PostDropDown";
import PostTextArea from "../components/post/PostTextArea";
import PostPrice from "../components/post/PostPrice";
import PostDate from "../components/post/PostDate";

import { db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import moment from "moment";
import useUser from "../hooks/useUser";
import { dateFormat } from "../common/date";

const AuctionPostPage = () => {
  const user = useUser();
  // 이미지 파일 state
  const [images, setImages] = useState([]);
  // inputs
  const [inputs, setInputs] = useState({
    minPrice: "",
    maxPrice: "",
    info: "",
    title: "",
    likes: 0,
    endDate: dateFormat(new Date()),
  });
  const { title, info, likes, endDate, minPrice, maxPrice } = inputs;
  const [idol, setIdol] = useState("");
  const [category, setCategory] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onPost = async () => {
    try {
      console.log({ inputs, idol, category });
      const productDB = db.collection("product");

      if (images.length === 0) {
        alert("이미지를 선택해주세요.");
        return;
      }

      if (
        !minPrice ||
        !maxPrice ||
        !info ||
        !title ||
        !endDate ||
        !idol ||
        !category
      ) {
        alert("모든 정보를 입력해주세요.");
        return;
      }

      const timeStamp = moment().format("YYYY-MM-DD hh:mm:ss");

      const imageRef = ref(
        storage,
        `product_image/${images[0].name}${timeStamp}`
      );

      const snapshot = await uploadBytes(imageRef, images[0]);

      const url = await getDownloadURL(snapshot.ref);

      const body = {
        minPrice: parseInt(minPrice),
        maxPrice: parseInt(maxPrice),
        info,
        idol,
        image: url,
        category,
        title,
        likes,
        date: new Date(),
        endDate: endDate,
        isComplete: 1,
        biddingPrice: 0,
        biddingDate: new Date(),
      };

      await productDB
        .add({
          ...body,
          uid: user.uid,
        })
        .then((doc) => {
          console.log(doc);
        })
        .catch((err) => {
          console.log("auction posting fail: ", err);
        });

      window.location.replace("/auction/auctionList");
    } catch (err) {
      console.log("post auction error: ", err);
    }
  };

  return (
    <PostContainer
      recommend={true}
      onPost={onPost}
      images={images}
      setImages={setImages}
    >
      <PostInputText
        label={"상품명"}
        value={title}
        name="title"
        onChange={onChange}
        placeholder="상품명을 입력해주세요.(30자 이내)"
      />
      <PostDropDown
        list={Category}
        label="굿즈 종류"
        selected={category}
        setSelected={setCategory}
      />
      <PostDropDown
        list={IdolList}
        label="아이돌"
        selected={idol}
        setSelected={setIdol}
      />
      <PostPrice
        label={"가격"}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChange={onChange}
      />
      <PostDate
        label="거래 완료 날짜"
        endDate={endDate}
        setInputs={setInputs}
      />
      <PostTextArea
        label="설명"
        value={info}
        name="info"
        onChange={onChange}
        placeholder="설명을 입력해주세요."
      />
    </PostContainer>
  );
};

export default AuctionPostPage;

const Container = styled.div``;
