import React, {useState} from 'react';
import './App.css';
import Game from './components/Game/Game';
import {hexToRgb, randomIntFromInterval} from './components/utils';
import Navbar from './components/NavBar/Navbar';

function getFormattedColors(colors: string[]) {
    const defaultGradient = `linear-gradient(40deg, rgba(${hexToRgb('#1ad02c')},0.8) , rgba(${hexToRgb('#cecece')}, 0) 90%)`;
    const formattedColor: string[] = [defaultGradient];

    for (const color of colors) {
        formattedColor.push(`linear-gradient(${randomIntFromInterval(0, 360)}deg, rgba(${hexToRgb(color)},0.8), rgba(${hexToRgb(color)},0) 90%)`);
    }

    return formattedColor.join(', ');
}

function App() {
    const [colors, setColors] = useState<string[]>([]);

    const colorString = getFormattedColors(colors);

    // set background color to all player's color
    const customBackground = {
        background: `${colorString}`,
    };

    return (
        <div className="App" style={customBackground}>
            <Navbar/>
            <Game setColors={setColors}/>
        </div>
    );
}

export default App;
