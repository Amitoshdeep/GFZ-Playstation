import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { motion } from "framer-motion";
import slugify from "slugify";
import SkeletonCard from "../components/HelpingComponents/SkeletonCard";
import { IoMdCheckmarkCircle } from "react-icons/io";

function GamePage() {
  const { title } = useParams();
  const { data: games, loading, error } = useFetchData("/data/Game.json");

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-zinc-900 text-white">
        <SkeletonCard />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-zinc-900 text-red-400">
        Error loading game 😭
      </div>
    );

  const game = games.find(
    (g) => slugify(g.title, { lower: true }) === title
  );

  if (!game)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-900 text-white">
        <p className="text-2xl">Game not found 😢</p>
        <Link to="/" className="mt-4 text-blue-400 hover:underline">
          Back to home
        </Link>
      </div>
    );

  const features = [
    { icon: <IoMdCheckmarkCircle size={28} />, title: "Lifetime Warranty" },
    { icon: <IoMdCheckmarkCircle size={28} />, title: "24x7 Support" },
    { icon: <IoMdCheckmarkCircle size={28} />, title: "Instant Delivery" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-zinc-900 text-white flex flex-col md:flex-row items-center justify-center gap-12 p-8"
    >
      {/* Cover Image */}
      <motion.img
        src={game.cvrImg}
        alt={game.title}
        className="w-80 rounded-2xl shadow-lg shadow-black/50 object-cover"
        initial={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />

      {/* Info Section */}
      <div className="flex flex-col gap-6 max-w-lg">
        <h1 className="text-4xl font-bold text-white">{game.title}</h1>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2 bg-zinc-800/70 backdrop-blur-sm p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-green-400">{f.icon}</div>
              <p className="font-semibold">{f.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Description / Steps */}
        <div className="bg-zinc-800/70 backdrop-blur-sm p-4 rounded-lg shadow-md space-y-2">
          <p>1️⃣ Choose if you want to <strong>Rent</strong> or <strong>Buy</strong>.</p>
          <p>2️⃣ Click the respective button and scan the QR to pay.</p>
          <p>3️⃣ Take a screenshot of the payment and click for confirmation.</p>
          <p>4️⃣ Confirmation will be done on WhatsApp.</p>
          <p>5️⃣ You’ll receive the game after verification.</p>
        </div>

        {/* Rent / Buy Buttons */}
        <div className="flex gap-4 mt-4">
          <Link
            to={`/game/${slugify(game.title, { lower: true })}/rent`}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-md transition duration-200 text-center"
          >
            Rent – {game.rent}
          </Link>
          <Link
            to={`/game/${slugify(game.title, { lower: true })}/buy`}
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold shadow-md transition duration-200 text-center"
          >
            Buy – {game.price}
          </Link>
        </div>

        {/* Back Link */}
        <Link
          to="/"
          className="mt-6 text-blue-400 hover:text-blue-300 underline transition"
        >
          ← Back to Games
        </Link>
      </div>
    </motion.div>
  );
}

export default GamePage;
