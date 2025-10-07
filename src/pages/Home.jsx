import React from 'react'

import Navbar from "../components/Navbar";
import Hero from "../components/HeroBanner";
import HeroSlider from '../components/HeroSlider';
import GamesSection from '../components/GamesSection';
import ImageSwiper from '../components/ImageSwiper';

function Home() {
  return (
    <>
    <div className='h-screen w-screen overflow-x-hidden  font-besopke cursor-default bg-black'>
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <Hero/>

      <HeroSlider/>

      <GamesSection/>

      <div className='py-10 text-white font-tanker px-10'>
        <h2 className=' font-tanker text-4xl'>Customer Screenshots</h2>
        <p>Real WhatsApp screenshots from our customers.</p>
        <ImageSwiper/>
      </div>
    </div>

    </>
  )
}

export default Home
