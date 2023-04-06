import React from "react";

import { postInputWidth } from "./PostInputBox";

import PostInputBox from "./PostInputBox";
import DropDownMenu from "../common/DropDownMenu";

const PostDropDown = ({ label, selected, setSelected, list }) => {
  return (
    <PostInputBox label={label}>
      <DropDownMenu
        list={list}
        selected={selected}
        setSelected={setSelected}
        width={postInputWidth}
      />
    </PostInputBox>
  );
};

export default PostDropDown;
