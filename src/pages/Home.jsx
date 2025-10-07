import React from 'react'

import Navbar from "../components/Navbar";
import Hero from "../components/HeroBanner";
import HeroSlider from '../components/HeroSlider';
import GamesSection from '../components/GamesSection';

function Home() {
  return (
    <>
    <div className='h-screen w-screen  font-besopke cursor-default bg-black'>
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <Hero/>

      <HeroSlider/>

      <GamesSection/>

    </div>

    </>
  )
}

export default Home
