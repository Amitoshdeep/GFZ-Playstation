import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function GameCard() {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 10;

  useEffect(() => {
    fetch("/data/Game.json")
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err));
  }, []);

  // Slice games for current page
  const offset = currentPage * gamesPerPage;
  const currentGames = games.slice(offset, offset + gamesPerPage);
  const pageCount = Math.ceil(games.length / gamesPerPage);

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className='text-white h-max gap-5 flex flex-col p-4'>
      {/* Game cards grid */}
      <div className='flex flex-wrap gap-5 justify-center'>
        {currentGames.map((game, index) => (
          <div
            key={index}
            className='flex flex-col gap-3 items-center p-4 rounded-3xl bg-zinc-900 duration-300 shadow-zinc-700 hover:shadow-lg hover:-translate-y-2'
          >
            <img
              src={game.cvrImg}
              alt={game.title}
              className='h-60 aspect-[12/16] object-cover rounded-2xl'
            />
            <p className='text-xl'>{game.title}</p>
            <p className='flex gap-2 text-lg'>
              <span>{game.rent}</span> - <span>{game.price}</span>
            </p>
          </div>
        ))}
      </div>

      {/* React Paginate */}
      <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'flex gap-2 justify-center mt-6'}
        pageClassName={'px-3 py-1 border rounded hover:bg-zinc-700 cursor-pointer'}
        previousClassName={'px-3 py-1 border rounded hover:bg-zinc-700 cursor-pointer'}
        nextClassName={'px-3 py-1 border rounded hover:bg-zinc-700 cursor-pointer'}
        activeClassName={'bg-blue-600 text-white'}
      />
    </div>
  );
}

export default GameCard;
