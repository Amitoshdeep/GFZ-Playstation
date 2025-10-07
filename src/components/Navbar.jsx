import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import slugify from "slugify";

function Navbar() {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const { data: games = [] } = useFetchData("/data/Game.json");

  // Update suggestions as user types
  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }

    const matches = games.filter((game) =>
      game.title.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(matches.slice(0, 5)); // max 5 suggestions
  }, [search, games]);

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/search/${encodeURIComponent(search.trim())}`);
      setSearch("");
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSuggestionClick = (title) => {
    navigate(`/game/${slugify(title, { lower: true })}`);
    setSearch("");
    setSuggestions([]);
  };

  return (
    <div className="flex justify-between items-center p-3 px-4 md:px-7 font-tanker bg-black sticky top-0 z-50">
      {/* GFZ Name */}
      <Link to="/" className="text-2xl text-white flex-shrink-0">
        GFZ
      </Link>

      {/* Search Bar */}
      <div className="flex-1 relative max-w-xl w-full mx-4 md:mx-0">
        <div className="flex h-10 items-center text-white w-full">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            className="font-besopke bg-white-10 border-[1px] border-white-30 h-full w-full p-1 px-4 md:px-5 outline-none rounded-l-3xl focus:border-blue-500 duration-300"
          />
          <button
            onClick={handleSearch}
            className="px-4 md:px-5 bg-white-20 w-max h-full rounded-r-3xl border-l-0 border-[1px] border-white-30"
          >
            <IoSearch />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full text-white bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-[999] mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((game, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(game.title)}
                className="px-4 py-2 cursor-pointer hover:bg-zinc-800 duration-200"
              >
                {game.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Logo + Instagram */}
      <div className="relative flex-shrink-0">
        <AiFillInstagram
          className={`absolute text-4xl right-0 md:right-12 -translate-y-1/2 bg-zinc-800 text-white rounded-full p-1.5 duration-300 cursor-pointer ${
            active ? "top-15 md:top-1/2" : "-top-10"
          }`}
          onClick={() =>
            window.open("https://www.instagram.com/gfz_playstation/")
          }
        />
        <img
          src="/assets/imgs/GFZ.jpg"
          alt=""
          className="h-9 rounded-full z-10 relative cursor-pointer hover:scale-[1.1] duration-300"
          onClick={() => setActive(!active)}
        />
      </div>
    </div>
  );
}

export default Navbar;
