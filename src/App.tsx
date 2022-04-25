import React, {useState} from 'react';
import './App.css';
import Game from './components/Game/Game';

import Navbar from './components/NavBar/Navbar';


function App() {


    // set background color to all player's color

    return (
        <>
            <div className="background-image"/>
            <div className="App">
                <Navbar/>
                <Game/>
            </div>
        </>
    );
}

export default App;
