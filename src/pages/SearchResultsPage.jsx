import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import slugify from "slugify";
import SkeletonCard from "../components/HelpingComponents/SkeletonCard";
import { motion, AnimatePresence } from "framer-motion";

function SearchResultsPage() {
  const { query } = useParams();
  const { data: games, loading, error } = useFetchData("/data/Game.json");

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-zinc-900 text-white">
        <p className="text-lg">Loading games...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-zinc-900 text-red-400">
        <p className="text-lg">Error loading games 😭</p>
      </div>
    );

  // Filter games by query (case-insensitive)
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredGames.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white gap-4">
        <p className="text-2xl font-semibold">
          No results found for "{query}" 😢
        </p>
        <Link
          to="/"
          className="text-blue-400 hover:underline transition duration-200"
        >
          ← Back to Home
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 md:p-12 flex flex-col gap-8">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
        Search Results for "{query}"
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="wait">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id || index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="bg-zinc-900 rounded-2xl shadow-md shadow-zinc-800 overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-transform duration-300"
            >
              <Link
                to={`/game/${slugify(game.title, { lower: true })}`}
                className="flex flex-col"
              >
                {/* Image */}
                <div className="h-64 w-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                  <img
                    src={game.cvrImg}
                    alt={game.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Card Info */}
                <div className="p-4 flex flex-col gap-2">
                  <p className="text-xl font-semibold truncate">{game.title}</p>
                  <p className="text-lg text-zinc-300 flex gap-2">
                    <span className="text-green-400">{game.rent}</span> -{" "}
                    <span className="text-blue-400">{game.price}</span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SearchResultsPage;
