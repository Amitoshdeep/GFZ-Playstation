import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import { motion } from 'framer-motion'

// Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

function HeroBanner() {
  return (
    <div className="w-screen h-screen relative overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          hideOnClick: true,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="h-full"
      >
        {/* --- SLIDE 1 --- */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="/assets/imgs/PlayStation1.jpeg"
              alt="PlayStation Banner"
              className="w-full h-full object-cover"
            />

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* text overlay */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="
                absolute z-20
                bottom-10 md:bottom-20
                left-6 md:left-16
                w-[90%] md:w-[60%]
                text-center md:text-left
              "
            >
              <h1 className="
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                font-bold text-white mb-3 md:mb-4 drop-shadow-lg
              ">
                Ghost of Yōtei
              </h1>
              <p className="
                text-sm sm:text-base md:text-lg text-gray-200
                mb-4 md:mb-6 leading-snug md:leading-normal
              ">
                Digital Deluxe Edition — Experience the beauty of war and honor.
              </p>
              <button className="
                bg-yellow-500 hover:bg-yellow-600 transition-all
                px-4 py-2 sm:px-5 sm:py-3 rounded-xl font-semibold text-black
                text-sm sm:text-base
              ">
                Explore Now
              </button>
            </motion.div>
          </div>
        </SwiperSlide>

        {/* --- SLIDE 2 --- */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="/assets/imgs/PlayStation3.jpg"
              alt="PlayStation Banner 2"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="
                absolute z-20
                bottom-10 md:bottom-20
                left-6 md:left-16
                w-[90%] md:w-[60%]
                text-center md:text-left
              "
            >
              <h1 className="
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                font-bold text-white mb-3 md:mb-4 drop-shadow-lg
              ">
                Assasin Creed Shadows
              </h1>
              <p className="
                text-sm sm:text-base md:text-lg text-gray-200
                mb-4 md:mb-6 leading-snug md:leading-normal
              ">
                Discover the vast lands and ancient machines.
              </p>
              <button className="
                bg-yellow-500 hover:bg-yellow-600 transition-all
                px-4 py-2 sm:px-5 sm:py-3 rounded-xl font-semibold text-black
                text-sm sm:text-base
              ">
                Play Now
              </button>
            </motion.div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default HeroBanner
