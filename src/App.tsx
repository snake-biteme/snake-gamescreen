import React, {useEffect, useState} from 'react';
import './App.css';
import Game from './components/Game/Game';
import {randomIntFromInterval} from './components/utils';
import Navbar from './components/NavBar/Navbar';

function App() {
    const [colors, setColors] = useState<string[]>([]);
    const [degree, setDegree] = useState<number>(45);

    const colorString = colors.join(', ');
    // set background color to all player's color
    const customBackground = {
        background: `linear-gradient(${degree}deg, var(--primary-color), ${colorString === '' ? 'var(--secondary-color)' : colorString})`,
    };

    useEffect(() => {
        setDegree(randomIntFromInterval(0, 360));
    }, []);

    return (
        <div className="App" style={customBackground}>
            <Navbar/>
            <Game setColors={setColors}/>
        </div>
    );
}

export default App;
