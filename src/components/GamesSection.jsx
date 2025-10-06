import React from 'react'
import GameCard from '../components/HelpingComponents/GameCard'

function GamesSection() {
  return (
    <div className='text-white font-tanker py-4 px-10 flex flex-col'>
      <h2 className='text-4xl'>
        PlayStation Picks
      </h2>

      <GameCard/>

    </div>
  )
}

export default GamesSection
