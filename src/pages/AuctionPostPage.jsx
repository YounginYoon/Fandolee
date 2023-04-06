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

const AuctionPostPage = () => {
  // 이미지 파일 state
  const [images, setImages] = useState([]);
  // inputs
  const [inputs, setInputs] = useState({
    minPrice: 0,
    maxPrice: 0,
    info: "",
    title: "",
    subtitle: "",
    likes: 0,
    endDate: "",
  });
  const { title, subtitle, info, likes, endDate, minPrice, maxPrice } = inputs;
  const [idol, setIdol] = useState("");
  const [category, setCategory] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onPost = () => {};

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
        placeholders={["최소 금액", "최대 금액"]}
        names={["minPrice", "maxPrice"]}
        values={[minPrice, maxPrice]}
        onChnage={onChange}
      />
      <PostDate label="거래 완료 날짜" />
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
