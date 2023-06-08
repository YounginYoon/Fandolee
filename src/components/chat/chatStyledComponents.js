import styled, { css } from "styled-components";
import { colors } from "../../common/color";

export const Container = styled.div`
  box-sizing: border-box;
  width: 600px;
  height: max-content;
  border-radius: 5px;
  border: 2px solid ${colors.COLOR_MAIN};
  margin-left: 30px;
  position: relative;
`;

export const CurrentAuctionIcon = styled.div`
  position: absolute;
  //   top: 15px;
  //   right: 15px;
  top: -50px;
  right: 10px;
  z-index: 100;
  background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  color: ${colors.COLOR_MAIN};
  font-size: 20px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  box-shadow: 3px 7px 7px 0 rgba(176, 176, 176, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CurrentAuctionDiv = styled.div`
  position: absolute;
  //   top: 1%;
  // left: 1%;
  top: -60px;
  left: 0;

  z-index: 100;
  box-sizing: border-box;
  //width: 98%;
  width: 100%;
  // background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  background-color: rgba(236, 245, 233, 0.7);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  //   padding: 20px;
  height: 50px;
  border-radius: 7px;
  box-shadow: 5px 10px 10px 0 rgba(176, 176, 176, 0.4);
  //   cursor: pointer;
`;

export const CurrentAuctionText = styled.p`
  color: ${colors.COLOR_MAIN};
  font-weight: bold;
  font-size: 16px;
`;

export const BiddingPriceDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const BiddingLabel = styled.p`
  font-size: 13px;
  margin-right: 10px;
  //   color: ${colors.COLOR_MAIN};
`;

export const BiddingPrice = styled.p`
  font-weight: bold;
`;

export const ChattingWrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  position: relative;

  background-image: url("/img/fandol.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 25%;
`;

export const Chatting = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 10;
  padding: 15px;
`;

export const InputBox = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
`;

export const CannotInput = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const Input = styled.input`
  border: 2px solid ${colors.COLOR_GREEN_BORDER};
  border-radius: 5px;
  background-color: ${colors.COLOR_LIGHTGREEN_BACKGROUND};
  width: 70%;
  padding: 0 10px;
  line-height: 40px;

  ${({ disabled }) => {
    if (disabled) {
      return css`
        border-color: ${colors.COLOR_DARKGRAY_BACKGROUND};
        background-color: ${colors.COLOR_LIGHTGRAY_BACKGROUND};
      `;
    }
  }}
`;

export const SendBtn = styled.div`
  border-radius: 5px;
  background-color: ${({ disabled }) =>
    disabled ? colors.COLOR_DARKGRAY_BACKGROUND : colors.COLOR_MAIN};
  color: white;
  font-weight: bold;
  line-height: 44px;
  text-align: center;
  width: 18%;
  cursor: pointer;
`;
