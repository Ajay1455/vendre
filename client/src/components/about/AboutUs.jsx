import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div style={{height:'100%'}}>
      <div class="bg-image"></div>
      <div className="about-us-container">
        <h1 className="about-us-heading">About Us</h1>
        <p className="about-us-description">
          We are a company dedicated to providing the best products to our
          customers. We strive to offer a wide variety of high-quality products
          at competitive prices. Our team is made up of passionate individuals
          who are committed to excellence and customer satisfaction. We believe
          that by putting our customers first and delivering exceptional
          service, we can build long-lasting relationships and become a trusted
          partner in their purchasing journey.
        </p>
        <h2 className="our-mission-heading">Our Mission</h2>
        <p className="our-mission-description">
          Our mission is to provide our customers with the best possible
          shopping experience. We believe in offering high-quality products at
          competitive prices, and we strive to exceed our customers'
          expectations with excellent service and support. We are committed to
          sustainability and ethical business practices, and we work closely
          with our suppliers to ensure that our products are responsibly sourced
          and manufactured. We are constantly innovating and improving our
          processes to ensure that we remain at the forefront of our industry.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
