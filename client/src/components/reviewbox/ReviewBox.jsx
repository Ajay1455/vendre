import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid dodgerblue;
  border-radius: 5px;
  margin: 50px;
  padding: 10px;
  width:40%;

  @media (max-width: 768px) {
    width: 90%;
    margin: 20px;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const Slider = styled.div`
  display: flex;
  position: absolute;
  width: calc(100% * 8);
  height: 100%;
  left: ${({ index }) => `-${index * 100}%`};
  transition: left 0.5s ease;
`;

const Slide = styled.div`
  width: calc(100% / 8);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Review = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ControlButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: ${({ active }) => (active ? "dodgerblue" : "#ccc")};
  margin: 0 5px;
  cursor: pointer;
`;

const ReviewBox = () => {
  const [index, setIndex] = useState(0);
  const [reviews, setReviews] = useState([]);

  useLayoutEffect(() => {
    fetch("/products/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => {
        console.error("Facing some issue regarding the database");
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((index + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [index, reviews]);

  const handleClick = (i) => {
    setIndex(i);
  };

  return (
    <Container>
      <SliderContainer>
        <Slider index={index}>
          {reviews.map((review) => (
            <Slide key={review._id}>
              <Image src={review.user.avatar} alt={review.name} />
              <Name>
                {review.user.firstName} {review.user.lastName}
              </Name>
              <Review>{review.comment}</Review>
            </Slide>
          ))}
        </Slider>
      </SliderContainer>
      <Controls>
        {reviews.map((_, i) => (
          <ControlButton
            key={i}
            active={i === index}
            onClick={() => handleClick(i)}
          />
        ))}
      </Controls>
    </Container>
  );
};

export default ReviewBox;
