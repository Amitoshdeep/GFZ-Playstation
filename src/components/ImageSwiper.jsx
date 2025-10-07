import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Your images
const images = [
  "/assets/WhatsappProofs/1.jpg",
  "/assets/WhatsappProofs/2.jpg",
  "/assets/WhatsappProofs/3.jpg",
  "/assets/WhatsappProofs/4.jpg",
  "/assets/WhatsappProofs/5.jpg",
  "/assets/WhatsappProofs/6.jpg",
  "/assets/WhatsappProofs/7.jpg",
  "/assets/WhatsappProofs/8.jpg",
  "/assets/WhatsappProofs/9.jpg",
  "/assets/WhatsappProofs/10.jpg",
  "/assets/WhatsappProofs/11.jpg",
  "/assets/WhatsappProofs/12.jpg",
  "/assets/WhatsappProofs/13.jpg",
];

const ImageSwiper = () => {
  return (
    <div className="relative">
      {/* Inset fog effect */}
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-between">
        <div className="w-16 bg-gradient-to-r from-black to-transparent"></div>
        <div className="w-16 bg-gradient-to-l from-black to-transparent"></div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        navigation={{ hideOnClick: true }} // auto-hide arrows
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        className="relative z-10"
        breakpoints={{
          0: {
            slidesPerView: 1, // Mobile
          },
          640: {
            slidesPerView: 2, // Small tablets
          },
          1024: {
            slidesPerView: 4, // Desktop
          },
          1280: {
            slidesPerView: 6, // Large screens
          },
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="w-full aspect-[9/16] overflow-hidden rounded-lg">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
