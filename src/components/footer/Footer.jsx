import React from "react";
import styled from "styled-components";
import { colors } from "../../config/color";

const Footer = () => {
  return <FooterDiv></FooterDiv>;
};

export default Footer;

export const footerHeight = "200px";
const FooterDiv = styled.div`
  width: 100%;
  background-color: ${colors.COLOR_FOOTER};
  height: ${footerHeight};
  position: absolute;
  bottom: 0;
  left: 0;
`;
