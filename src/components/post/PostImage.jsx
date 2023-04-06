import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { colors } from "../../common/color";

const PostImage = ({ images, setImages }) => {
  const [imageSrcs, setImageSrcs] = useState([]);

  const fileInputRef = useRef(null);

  // 이미지 소스 set
  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        const ret = reader.result;
        setImageSrcs([...imageSrcs, ret]);
        setImages([...images, file]);
        resolve();
      };
    });
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <Container>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onUpload}
      />

      <ImageContainer onClick={() => fileInputRef.current?.click()}>
        {imageSrcs.length > 0 ? (
          <Image src={imageSrcs[0]} />
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
      </ImageContainer>

      {imageSrcs.length > 0 ? (
        <ImageWrapper>
          <SubImageContainer onClick={() => fileInputRef.current?.click()}>
            {imageSrcs.length <= 1 ? (
              <FontAwesomeIcon icon={faPlus} />
            ) : (
              <Image src={imageSrcs[1]} />
            )}
          </SubImageContainer>

          {imageSrcs.length >= 2 ? (
            <SubImageContainer onClick={() => fileInputRef.current?.click()}>
              {imageSrcs.length < 3 ? (
                <FontAwesomeIcon icon={faPlus} />
              ) : (
                <Image src={imageSrcs[2]} />
              )}
            </SubImageContainer>
          ) : null}
        </ImageWrapper>
      ) : null}
    </Container>
  );
};

export default PostImage;

const Container = styled.div`
  width: 300px;
  //   height: 300px;
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid ${colors.COLOR_GRAY_BORDER};
  width: 100%;
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
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageWrapper = styled.div`
  padding-top: 6px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SubImageContainer = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid ${colors.COLOR_GRAY_BORDER};
  width: 146px;
  height: 146px;
  oberflow: hidden;
  cursor: pointer;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: ${colors.COLOR_GRAY_BORDER};
  position: relative;
`;
