import React, { useState } from "react";

import { IdolList } from "../constants/idol";
import { Category } from "../constants/category";
import { TransactionType } from "../constants/transactionType";
import { Region } from "../constants/region";

import PostContainer from "../components/post/PostContainer";
import PostInputText from "../components/post/PostInputText";
import PostDropDown from "../components/post/PostDropDown";
import PostTextArea from "../components/post/PostTextArea";

import useUser from "../hooks/useUser";
import { db, storage } from "../config/firebase";
import moment from "moment";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ExchangePostPage = () => {
  const user = useUser();
  // 이미지 파일 state
  const [images, setImages] = useState([]);
  // inputs
  const [inputs, setInputs] = useState({
    title: "",
    info: "",
    likes: 0,
    haveMember:"",
    wantMember:""
  });
  const { title, info,likes,haveMember,wantMember } = inputs;
  const [idol, setIdol] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onPost = async () => {
    try {
      //console.log({ inputs, idol, category });
      const productDB = db.collection("exchange");

      if (images.length === 0) {
        alert("이미지를 선택해주세요.");
        return;
      }

      if (
        !info ||
        !title ||
        !idol ||
        !category||
        !transactionType||
        !region
      ) {
        alert("모든 정보를 입력해주세요.");
        return;
      }

      const timeStamp = moment().format("YYYY-MM-DD hh:mm:ss");

      const imageRef = ref(
        storage,
        `exchange_image/${images[0].name}${timeStamp}`
      );

      const snapshot = await uploadBytes(imageRef, images[0]);

      const url = await getDownloadURL(snapshot.ref);

      const body = {
        info,
        idol,
        image: url,
        category,
        title,
        likes,
        date: new Date(),
        isComplete: 1,
        transactionType,
        region,
        haveMember,
        wantMember
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
          console.log("exchange posting fail: ", err);
        });

      window.location.replace("/exchange/list");
    } catch (err) {
      console.log("post exchange error: ", err);
    }
  };

  return (
    <PostContainer
      recommend={false}
      onPost={onPost}
      images={images}
      setImages={setImages}
    >
      <PostInputText
        label={"상품명"}
        value={title}
        name="title"
        onChange={onChange}
        placeholder="상품명을 입력해주세요.('보유멤버->교환멤버')"
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
      <PostInputText
        label={"보유 멤버"}
        value={haveMember}
        name="haveMember"
        onChange={onChange}
        placeholder="보유 멤버 명을 기입해주세요."
      />
      <PostInputText
        label={"교환 멤버"}
        value={wantMember}
        name="wantMember"
        onChange={onChange}
        placeholder="교환원하는 멤버 명을 기입해주세요."
      />
      <PostDropDown
        list={Region}
        label="지역"
        selected={region}
        setSelected={setRegion}
      />
      <PostDropDown
        list={TransactionType}
        label="교환방법"
        selected={transactionType}
        setSelected={setTransactionType}
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

export default ExchangePostPage;
