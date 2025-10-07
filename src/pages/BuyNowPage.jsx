import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import slugify from "slugify";
import { QRCodeSVG } from "qrcode.react";
import { IoLogoWhatsapp } from "react-icons/io";

const UPI_ID = "8544890833@fam";
const WHATSAPP_NUMBER = "918544890833";

function BuyNowPage() {
  const { title, type } = useParams();
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
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
    game.title
  )}&am=${price}&cu=INR&tn=${type}`;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi! I have completed the ${type} payment for "${game.title}". Please confirm.`
  )}`;

  // Rent-specific info
  const rentInfo =
    type === "rent"
      ? {
          pricePerMonth: "₹1,000",
          maxDuration: "2 months",
          options: ["1 month", "1.5 months", "2 months"],
        }
      : null;

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-8 gap-6">
      {/* Title & Price */}
      <h1 className="text-3xl font-bold text-center">
        {game.title} – {type === "rent" ? "Rent" : "Buy"}
      </h1>
      <p className="text-2xl font-semibold text-green-400">{price}</p>

      {/* QR Code */}
      <div className="bg-zinc-800 rounded-lg p-6 shadow-md flex flex-col items-center gap-3">
        <p className="text-center font-medium">Scan this QR to pay</p>
        <QRCodeSVG value={upiLink} size={220} />
      </div>

      {/* Instructions */}
      <div className="bg-zinc-800 rounded-lg p-4 max-w-md shadow-md space-y-2 text-zinc-300">
        <p>1️⃣ Scan QR and complete the payment.</p>
        <p>2️⃣ Take a screenshot of the payment.</p>
        <p>3️⃣ Click the WhatsApp button below to confirm payment.</p>
        <p>4️⃣ You will receive the game after verification.</p>

        {/* Rent-specific T&C */}
        {rentInfo && (
          <div className="mt-2 text-zinc-200">
            <p>💰 Price per month: {rentInfo.pricePerMonth}</p>
            <p>⏳ Max duration: {rentInfo.maxDuration}</p>
            <p>📅 Available durations: {rentInfo.options.join(", ")}</p>
          </div>
        )}
      </div>

      {/* Back Link */}
      <Link
        to={`/game/${slugify(game.title, { lower: true })}`}
        className="mt-2 text-blue-400 hover:underline transition"
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
