import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import slugify from "slugify";
import { QRCodeSVG } from "qrcode.react";
import { IoLogoWhatsapp } from "react-icons/io";

// ✅ Config constants
const UPI_ID = "8544890833@fam"; // easy to update
const WHATSAPP_NUMBER = "918544890833"; // international format without "+" (e.g., 91XXXXXXXXXX)

function BuyNowPage() {
  const { title, type } = useParams(); // type = 'rent' or 'buy'
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
        <p>Error loading game 😭</p>
      </div>
    );

  const game = games.find(
    (g) => slugify(g.title, { lower: true }) === title
  );

  if (!game)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-900 text-white">
        <p className="text-2xl">Game not found 😢</p>
        <Link
          to="/"
          className="mt-4 text-blue-400 hover:underline transition"
        >
          ← Back to home
        </Link>
      </div>
    );

  const price = type === "rent" ? game.rent : game.price;

  // Dynamic UPI link
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
    game.title
  )}&am=${price}&cu=INR&tn=${type}`;

  // WhatsApp link
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi! I have completed the ${type} payment for "${game.title}". Please confirm.`
  )}`;

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-6 gap-8 relative">
      {/* Game Title & Type */}
      <h1 className="text-4xl font-bold text-center">
        {game.title} – {type === "rent" ? "Rent" : "Buy"}
      </h1>

      {/* Price */}
      <p className="text-2xl font-semibold text-green-400">{price}</p>

      {/* QR Code */}
      <div className="bg-zinc-800 rounded-lg p-6 shadow-lg flex flex-col items-center gap-4">
        <p className="text-center text-white font-medium">
          Scan this QR to pay
        </p>
        <QRCodeSVG value={upiLink} size={256} />
      </div>

      {/* Instructions */}
      <p className="text-center text-zinc-300 max-w-md">
        After payment, take a screenshot and send via WhatsApp for
        confirmation. You’ll receive the game after verification.
      </p>

      {/* Back Link */}
      <Link
        to={`/game/${slugify(game.title, { lower: true })}`}
        className="mt-4 text-blue-400 hover:underline transition"
      >
        ← Back to Game
      </Link>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
        title="Confirm Payment via WhatsApp"
      >
        <IoLogoWhatsapp className="text-2xl"/>
      </a>
    </div>
  );
}

export default BuyNowPage;
