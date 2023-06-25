import React, { useState, useEffect } from "react";
import "./Slider.css";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const SLIDE_DURATION = 5000; // in milliseconds
  const images = [
    { url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg" },
    { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80" },
    { url: "https://burst.shopifycdn.com/photos/wrist-watches.jpg?width=1200&format=pjpg&exif=1&iptc=1" }
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, SLIDE_DURATION);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="slider">
      {images.map((image, index) => (
        <div
          key={index}
          className={index === currentIndex ? "slide active" : "slide"}
          style={{ backgroundImage: `url(${image.url})` }}
        ></div>
      ))}
    </div>
  );
};

export default Slider;
