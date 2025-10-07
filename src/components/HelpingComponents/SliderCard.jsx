import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoLoop from '../HelpingComponents/LogoLoop';
import useFetchData from '../../hooks/useFetchData';
import SkeletonCard from './SkeletonCard';

function SliderCard() {
  const { data: games, loading, error } = useFetchData("/data/slideGame.json");

  if (error)
    return <p className="text-red-400 text-center">Error loading slider 😭</p>;

  // Convert game data into loop-friendly nodes
  const gameLogos = games.map((game, index) => ({
    node: (
      <motion.div
        key={game.id || index}
        className="relative flex items-end justify-start w-[300px] h-[170px] bg-cover bg-center rounded-xl shadow-lg overflow-hidden"
        style={{ backgroundImage: `url(${game.bnrImg})` }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <img
          src={game.cvrImg}
          alt={game.title}
          className="h-20 w-16 object-cover rounded-md ml-4 mb-3 border border-zinc-700"
        />
        <div className="absolute bottom-3 left-24 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
          <p className="text-sm font-semibold text-white">{game.title}</p>
        </div>
      </motion.div>
    ),
  }));

  return (
    <div className="p-4">
      {loading ? (
        // Show skeletons while loading
        <div className="flex gap-5 justify-center flex-wrap">
          {Array(5)
            .fill()
            .map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <SkeletonCard />
              </motion.div>
            ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="slider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LogoLoop
              logos={gameLogos}
              speed={80}              // control scroll speed
              direction="left"        // or "right"
              logoHeight={180}        // height of each item
              gap={20}                // space between slides
              fadeOut                 // enable edge fade
              pauseOnHover            // stop when hovered
              scaleOnHover={false}
              ariaLabel="Game showcase slider"
              className="text-white"
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default SliderCard;
