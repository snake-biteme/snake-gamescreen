import React, {useEffect, useState} from 'react';
import apiClientAppSync from "../services/apiClientAppSync";
import {updatePosition} from "../services/graphql";
import {IPositionSchema, IRealTimeData} from "../interfaces/api";


function makeSnake(data: IPositionSchema) {
    return <div key={data.playerId} style={{background: data.color, width: "30px", height: "30px"}}>{data.playerId}</div>
}

function Screen() {
    const [snakes, setSnakes] = useState({});
    const screenId = 'asdfsdfasdfsd';

    const realtimeResults = (data: IRealTimeData) => {
        const position = data.data.onPositionUpdated;

        console.log('realtime data: ', position);
        setSnakes(prevState => {
            return {...prevState, [position.playerId]: makeSnake(position)}
        })
    };

    useEffect(() => {
        apiClientAppSync.hydrated().then((client) => {
            const observable = client.subscribe({
                query: updatePosition,
                variables: {
                    screenId: screenId,
                }
            });

            observable.subscribe({
                next: realtimeResults,
                complete: console.log,
                error: console.error,
            });
        });
    }, [])


    return (
        <div>
            Game
            {Object.values(snakes)}
        </div>

    );
}

export default Screen;