import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CarouselComponent = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [images, setImages] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/carousel`);
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  const settings = {
    dots: false,
    fade: false,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  return (
    <div className="relative h-full">
      {/* Previous Button */}
     

      <Slider ref={sliderRef} {...settings}>
        {images.map((src, index) => (
          <div
            key={index}
            className="h-[300px] lg:h-[500px] overflow-hidden rounded-xl shadow-md"
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
