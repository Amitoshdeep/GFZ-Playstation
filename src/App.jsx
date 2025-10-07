import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import Funny404 from './pages/Funny404';
import GamePage from './pages/GamePage';
import BuyNowPage from './pages/BuyNowPage';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
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
