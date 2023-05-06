import React, { useRef, useState } from "react";

import moment from "moment";
import Calendar from "react-calendar";
import "./calendar.css"; // css import

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import { postInputWidth } from "./PostInputBox";
import PostInputBox from "./PostInputBox";

import styled from "styled-components";
import { colors } from "../../common/color";
import { dateFormat } from "../../common/date";

import { addDays } from "date-fns"

const PostDate = ({ label, endDate, setInputs }) => {
  const today = addDays(new Date(),1);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [value, setValue] = useState(dateFormat(today));

  const iconRef = useRef();

  const onClick = (e) => {
    if (e.target === e.currentTarget || iconRef.current === e.target) {
      setOpenCalendar(!openCalendar);
    }
  };

  const onChange = (date) => {
    if (dateFormat(date) < dateFormat(today)) {
      return;
    }
    setInputs((prev) => ({
      ...prev,
      endDate: date,
    }));
    setOpenCalendar(false);
  };

  return (
    <PostInputBox label={label}>
      <DateDiv onClick={onClick}>
        {moment(endDate).format("YYYY년 MM월 DD일")}

        <FontAwesomeIcon
          icon={faCalendarDays}
          ref={iconRef}
          style={iconStyle}
        />

        {openCalendar ? (
          <Calendar
            onChange={onChange}
            value={endDate}
            tileClassName={({ date, view }) => {
              if (today > date) {
                return "highlight";
              }
            }}
          />
        ) : null}
      </DateDiv>
    </PostInputBox>
  );
};

export default PostDate;

const DateDiv = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  padding: 0 10px;
  height: 35px;
  line-height: 35px;
  width: ${postInputWidth};
  cursor: pointer;
  font-size: 14px;
  position: relative;
`;

const iconStyle = {
  color: colors.COLOR_MAIN,
  fontSize: "18px",
  position: "absolute",
  top: "8.25px",
  right: "10px",
};
