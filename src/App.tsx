import React from 'react';
import './App.css';
import Game from './components/Game/Game';
import Navbar from './components/NavBar/Navbar';
import SmallScreen from './components/SmallScreen/SmallScreen';
import * as amplitude from '@amplitude/analytics-browser';
import {AMPLITUDE_API_KEY, SCREEN_ID} from './consts';


function App() {
    // to keep the screen from sleep: https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
    // only supported on Chrome
    AMPLITUDE_API_KEY && amplitude.init(AMPLITUDE_API_KEY);
    amplitude.track('Start game', {screenId: SCREEN_ID});
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
            <div className="App">
                {window.innerWidth > 600 && window.innerHeight > 500 ?
                    <>
                        <Navbar/>
                        <Game/>
                    </> :
                    <SmallScreen/>
                }
            </div>
        </>
    );
}

export default App;
