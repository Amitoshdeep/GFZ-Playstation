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
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        <AnimatePresence>
          <motion.img
            src="/assets/imgs/GFZ.jpg"
            alt="GFZ Logo"
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{
              opacity: 1,
              scale: [0.5, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-32 w-32 rounded-full"
          />
        </AnimatePresence>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
          className="text-white mt-4 text-xl font-bold animate-pulse"
        >
          {/* Loading... */}
        </motion.p>
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
