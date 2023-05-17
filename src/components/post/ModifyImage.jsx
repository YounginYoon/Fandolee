import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { colors } from "../../common/color";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const ModifyImage = ({ images, setImages, imageUrls, setImageUrls }) => {
  const [imageSrcs, setImageSrcs] = useState([]);
  const fileInputRef = useRef(null);

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
        e.target.value = "";
      };
    });
  };

  const onClick = (index) => {
    if (imageSrcs.length <= index) {
      fileInputRef.current?.click();
      return;
    }
  };

  const onDelete = (index) => {
    if (imageUrls.length === 0) {
      const newImages = images.filter((_, idx) => idx !== index);
      setImages(newImages);
    } else if (imageUrls.length > 0) {
      const newImageUrls = imageUrls.filter((_, idx) => idx !== index);
      setImageUrls(newImageUrls);
    }
    const newImageSrcs = imageSrcs.filter((_, idx) => idx !== index);

    setImageSrcs(newImageSrcs);
  };

  useEffect(() => {
    setImageSrcs(imageUrls);
  }, []);

  return (
    <Container>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onUpload}
      />

      <ImageContainer onClick={() => onClick(0)}>
        {imageSrcs.length > 0 ? (
          <>
            <Image src={imageSrcs[0]} />
            <DeleteIcon onClick={() => onDelete(0)}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </DeleteIcon>
          </>
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
      </ImageContainer>

      {imageSrcs.length > 0 ? (
        <ImageWrapper>
          <SubImageContainer onClick={() => onClick(1)}>
            {imageSrcs.length <= 1 ? (
              <FontAwesomeIcon icon={faPlus} />
            ) : (
              <>
                <Image src={imageSrcs[1]} />
                <DeleteIcon onClick={() => onDelete(1)}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </DeleteIcon>
              </>
            )}
          </SubImageContainer>

          {imageSrcs.length >= 2 ? (
            <SubImageContainer onClick={() => onClick(2)}>
              {imageSrcs.length < 3 ? (
                <FontAwesomeIcon icon={faPlus} />
              ) : (
                <>
                  <Image src={imageSrcs[2]} />
                  <DeleteIcon onClick={() => onDelete(2)}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </DeleteIcon>
                </>
              )}
            </SubImageContainer>
          ) : null}
        </ImageWrapper>
      ) : null}
    </Container>
  );
};

export default ModifyImage;

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

const DeleteIcon = styled.div`
  position: absolute;
  // background-color: orange;
  top: 5%;
  right: 5%;
  z-index: 10;
  cursor: pointer;
  font-size: 18px;
  color: ${colors.COLOR_RED_TEXT};
`;
