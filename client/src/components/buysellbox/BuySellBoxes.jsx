import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Box = styled.div`
  /* background-image: url("https://acquisitionsdirect.com/wp-content/uploads/2014/11/sell-online-business.jpg"); */
  /* background-size: cover; */
  padding: 40px 30px;
  border: 1px solid deepskyblue;
  text-align: center;
  width: 100%;
  max-width: 400px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Title = styled.h1`
  margin-top: 0;
  color: black;
`;

const Subtitle = styled.p`
  margin-bottom: 10px;
  color: black;
`;

const Text = styled.p`
  margin: 5px 0;
  color: black;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: white;
  color: deepskyblue;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: aliceblue;
  }
`;

const BuyBox = () => {
  return (
    <>
      <div style={{ maxWidth: "400px" }}></div>
      <Box>
        <Title>Buy Products</Title>
        <Subtitle>Find the best deals on your favorite products</Subtitle>
        <Text>
          Shop now and save big on electronics, fashion, home goods, and more.
        </Text>
        <NavLink to={"/products"}>
          <Button>Shop Now</Button>
        </NavLink>
      </Box>
    </>
  );
};

const SellBox = () => {
  return (
    <Box>
      <Title>Sell Products</Title>
      <Subtitle>Join our marketplace and start selling today</Subtitle>
      <Text>
        List your products for free and reach millions of buyers worldwide.
      </Text>
      <NavLink to={"/sell"}>
        <Button>Sell Now</Button>
      </NavLink>
    </Box>
  );
};

const BuySellBoxes = () => {
  return (
    <Container>
      <BuyBox />
      <SellBox />
    </Container>
  );
};

export default BuySellBoxes;
