import React, { useRef, useState } from "react";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { colors } from "../../common/color";
import { ref } from "firebase/storage";
import { storage } from "../../config/firebase";

const PostImage = ({ images, setImages }) => {
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const imageRef = ref(storage, "product_image/");
  const fileInputRef = useRef(null);

  // 이미지 소스 set
  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        // setImage(file);
        resolve();
      };
    });
  };

  return (
    <Container onClick={() => fileInputRef.current?.click()}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onUpload}
      />

      {imageSrc ? <Image src={imageSrc} /> : <FontAwesomeIcon icon={faPlus} />}
    </Container>
  );
};

export default PostImage;

const Container = styled.div`
  border-radius: 5px;
  border: 2px solid ${colors.COLOR_GRAY_BORDER};
  width: 300px;
  height: 300px;
  oberflow: hidden;
  cursor: pointer;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  color: ${colors.COLOR_GRAY_BORDER};
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
