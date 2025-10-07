import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import useFetchData from '../../hooks/useFetchData';
import SkeletonCard from './SkeletonCard';
import slugify from 'slugify';

function GameCard() {
  const { data: games, loading, error } = useFetchData('/data/Game.json');
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 10;

  if (error)
    return <p className="text-red-400 text-center">Error loading games 😭</p>;

  // Pagination logic
  const offset = currentPage * gamesPerPage;
  const currentGames = games.slice(offset, offset + gamesPerPage);
  const pageCount = Math.ceil(games.length / gamesPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="text-white flex flex-col gap-5 p-4">
      {/* Game cards grid */}
      <div className="flex flex-wrap gap-5 justify-center">
        {loading
          ? Array(10)
              .fill()
              .map((_, i) => <SkeletonCard key={i} />)
          : (
            <AnimatePresence mode="wait">
              {currentGames.map((game, index) => {
                const gameSlug = slugify(game.title, { lower: true });

                return (
                  <motion.div
                    key={game.id || index}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                  >
                    <Link
                      to={`/game/${gameSlug}`}
                      className="block" // ensures link covers entire card
                    >
                      <div className="flex flex-col gap-3 items-center p-4 rounded-3xl bg-zinc-900 shadow-md shadow-zinc-800 duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer">
                        <img
                          src={game.cvrImg}
                          alt={game.title}
                          className="h-60 aspect-[12/16] object-cover rounded-2xl"
                        />
                        <p className="text-xl font-semibold">{game.title}</p>
                        <p className="flex gap-2 text-lg">
                          <span>{game.rent}</span> - <span>{game.price}</span>
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
      </div>

      {/* Pagination */}
      {!loading && (
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={
            'flex gap-2 justify-center mt-6 flex-wrap text-base'
          }
          pageClassName={
            'px-3 py-1 border border-zinc-700 rounded hover:bg-zinc-700 cursor-pointer duration-200'
          }
          previousClassName={
            'px-3 py-1 border border-zinc-700 rounded hover:bg-zinc-700 cursor-pointer duration-200'
          }
          nextClassName={
            'px-3 py-1 border border-zinc-700 rounded hover:bg-zinc-700 cursor-pointer duration-200'
          }
          activeClassName={'bg-blue-600 text-white border-blue-600'}
        />
      )}
    </div>
  );
}

export default GameCard;
