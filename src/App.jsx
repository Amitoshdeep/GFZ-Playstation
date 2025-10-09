import React, { useState, useEffect }  from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import Funny404 from './pages/Funny404';
import GamePage from './pages/GamePage';
import BuyNowPage from './pages/BuyNowPage';
import SearchResultsPage from './pages/SearchResultsPage';
import { motion, AnimatePresence } from "framer-motion";

function App() {
const [loading, setLoading] = useState(true);

  // simulate initial loading (2.5s)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

    if (loading) {
      return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="relative">
            {/* Blue ping circle */}
            <span className="absolute inline-flex h-32 w-32 rounded-full bg-blue-500 opacity-75 animate-ping"></span>

            {/* Logo */}
            <motion.img
              src="/assets/imgs/GFZ.jpg"
              alt="GFZ Logo"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative h-32 w-32 rounded-full z-10"
            />
          </div>
        </div>
      );
    }


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:title" element={<GamePage />} />
        <Route path="/game/:title/:type" element={<BuyNowPage />} />
        <Route path="/search/:query" element={<SearchResultsPage />} />
        <Route path="*" element={<Funny404 />} />
      </Routes>
    </>

  )
}

export default App
