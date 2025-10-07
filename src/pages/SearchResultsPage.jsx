import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import slugify from "slugify";
import SkeletonCard from "../components/HelpingComponents/SkeletonCard";
import { motion, AnimatePresence } from "framer-motion";

function SearchResultsPage() {
  const { query } = useParams(); // get search query from URL
  const { data: games, loading, error } = useFetchData("/data/Game.json");

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-zinc-900 text-white">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-zinc-900 text-red-400">
        <p>Error loading games 😭</p>
      </div>
    );

  // filter games by title containing query (case insensitive)
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredGames.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white gap-4">
        <p className="text-2xl">No results found for "{query}" 😢</p>
        <Link
          to="/"
          className="text-blue-400 hover:underline transition"
        >
          ← Back to home
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold mb-4">
        Search Results for "{query}"
      </h1>

      <div className="flex flex-wrap gap-5 justify-center">
        <AnimatePresence mode="wait">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id || index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="flex flex-col gap-3 items-center p-4 rounded-3xl bg-zinc-900 shadow-md shadow-zinc-800 duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer"
            >
              <Link to={`/game/${slugify(game.title, { lower: true })}`}>
                <img
                  src={game.cvrImg}
                  alt={game.title}
                  className="h-60 aspect-[12/16] object-cover rounded-2xl"
                />
                <p className="text-xl font-semibold mt-2">{game.title}</p>
                <p className="flex gap-2 text-lg">
                  <span>{game.rent}</span> - <span>{game.price}</span>
                </p>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SearchResultsPage;
