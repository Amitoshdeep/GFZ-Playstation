import React, { useEffect, useState } from 'react';
import LogoLoop from '../HelpingComponents/LogoLoop';

function SliderCard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('/data/slideGame.json')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err));
  }, []);

  // Convert your game data to the LogoLoop format
  const gameLogos = games.map(game => ({
    node: (
      <div
        className="relative flex items-end justify-start w-[300px] h-[170px] bg-cover bg-center rounded-xl shadow-lg overflow-hidden "
        style={{ backgroundImage: `url(${game.bnrImg})` }}
      >
        <img
          src={game.cvrImg}
          alt={game.title}
          className="h-20 w-16 object-cover rounded-md ml-4 mb-3"
        />
        <div className="absolute bottom-3 left-24 bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
          <p className="text-sm font-semibold text-white">{game.title}</p>
        </div>
      </div>
    ),
  }));

  return (
    <div className="p-4">
      <LogoLoop
        logos={gameLogos}
        speed={80}             // control scroll speed
        direction="left"        // or "right"
        logoHeight={180}        // height of each item
        gap={20}                // space between slides
        fadeOut                 // enable edge fade
        pauseOnHover            // stop when hovered
        scaleOnHover={false}
        ariaLabel="Game showcase slider"
        className="text-white"
      />
    </div>
  );
}

export default SliderCard;
