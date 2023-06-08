import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const ProductLikes = ({ likes }) => {
  return (
    <Likes>
      <FontAwesomeIcon icon={faHeart} style={{ marginRight: "3px" }} />
      {likes}
    </Likes>
  );
};

export default ProductLikes;

const Likes = styled.div`
  //   background-color: orange;
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
  color: ${colors.COLOR_GRAY_TEXT};
`;
