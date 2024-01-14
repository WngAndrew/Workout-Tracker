import { useState } from 'react'
import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TrainingBlocks from './pages/TrainingBlocks.jsx'
import CreateMacro from './create-pages/CreateMacro.jsx'
import CreateBlock from './create-pages/CreateBlock.jsx'
import Workouts from './pages/Workouts.jsx'

function App() {

  return (
    <div className='font-raleway'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path={'/CreateMacro'} element={<CreateMacro />}/>
        <Route path={'/:id/Blocks'} element={<TrainingBlocks />}/>
        <Route path={'/:id/Blocks/CreateBlock'} element={<CreateBlock />} />
        <Route path={'/:id/Blocks/:weekId/Workouts'} element={<Workouts />}/>
      </Routes>
    </div>
  )
}

export default App
