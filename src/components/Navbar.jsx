import React, { useState } from 'react'

import { IoSearch } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Navbar() {
  const [active, setActive] = useState(false);

  return (
    <div
    className='flex justify-between items-center p-3 h-15 px-7 font-tanker bg-black overflow-hidden sticky top-0 z-10 '>

    {/* Just Name */}
    <Link to='/'
      className='text-2xl text-white'>
        GFZ
    </Link>

    {/* Search Bar */}
    <div className='w-1/3 h-10 flex items-center text-white'>

      <input type="text" name="" id="" placeholder='Search'
      className='font-besopke bg-white-10 border-[1px] border-white-30 h-full w-[90%] p-1 px-5 outline-none rounded-l-3xl focus:border-blue-500 duration-300' />

      <button className='px-5 bg-white-20 w-max h-full rounded-r-3xl border-l-0 border-[1px] border-white-30 '>
        <IoSearch />
      </button>

    </div>

    {/* The Logo */}
    <div className='relative'>
      <AiFillInstagram
        className={`absolute text-4xl right-12 -translate-y-1/2 bg-gray-300 text-blue-500 rounded-full p-1 duration-300 cursor-pointer ${active ? "top-1/2" : "-top-10"}`}
        onClick={()=> window.open('https://www.instagram.com/gfz_playstation/')}
      />
      <img src="/assets/imgs/GFZ.jpg" alt="" className='h-9 rounded-full z-10 relative cursor-pointer hover:scale-[1.1] duration-300' onClick={()=> setActive(!active)}/>
    </div>


    </div>
  )
}

export default Navbar
