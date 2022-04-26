import React from 'react';
import './App.css';
import Game from './components/Game/Game';
import Navbar from './components/NavBar/Navbar';


function App() {
    // to keep the screen from sleep: https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
    // only supported on Chrome
    (async function keepWake() {
        if ('wakeLock' in navigator) {
            // create an async function to request a wake lock
            try {
                await navigator.wakeLock.request('screen');
            } catch (err) {
                // The Wake Lock request has failed - usually system related, such as battery.
                console.error('wakeLock Error', err);
            }
        }
    })();

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
