import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const FooterWrapper = styled.footer`
  background-color: #f2f2f2;
  padding: 50px 0;
  width: 100%;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;

  @media only screen and (max-width: 768px) {
    margin: 20px 0;
  }
`;

const FooterTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
`;

const FooterLink = styled.a`
  display: block;
  color: #333;
  text-decoration: none;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterSocial = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const FooterSocialLink = styled.a`
  display: inline-block;
  width: 30px;
  height: 30px;
  // background-color: #333;
  background-color: deepskyblue;
  color: #fff;
  border-radius: 50%;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  margin: 0 10px;

  &:hover {
    background-color: #fff;
    // color: #333;
    color: deepskyblue;
    border: 1px solid #333;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterColumn>
          <FooterTitle>About Us</FooterTitle>
          <FooterLink href="#">Our Story</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Press</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Customer Service</FooterTitle>
          <NavLink to="/contactUs">
            <FooterLink>Contact Us</FooterLink>
          </NavLink>
          <FooterLink href="#">Shipping & Returns</FooterLink>
          <FooterLink href="#">FAQs</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Connect With Us</FooterTitle>
          <FooterSocial>
            <FooterSocialLink href="#">
              <FaFacebookF />
            </FooterSocialLink>
            <FooterSocialLink href="#">
              <FaTwitter />
            </FooterSocialLink>
            <FooterSocialLink href="#">
              <FaInstagram />
            </FooterSocialLink>
          </FooterSocial>
        </FooterColumn>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
