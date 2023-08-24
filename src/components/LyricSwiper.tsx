import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

interface LyricsSwiperProps {
  lyrics: string;
}

const LyricSwiper: React.FC<LyricsSwiperProps> = ({ lyrics }) => {
  const lines = lyrics.split("\n").filter((line) => line.trim() !== "");

  // Remove the useSwiper hook since it's not needed in this context

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      navigation
      keyboard // Enable keyboard control
      loop
      onSlideChange={(swiper) => {
        console.log("Slide index changed:", swiper.activeIndex);
      }}
    >
      {lines.map((line, index) => (
        <SwiperSlide key={index} className="lyric-slide">
          {line}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LyricSwiper;
