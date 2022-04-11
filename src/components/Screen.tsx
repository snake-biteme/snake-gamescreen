import React, {useEffect, useState} from 'react';
import apiClientAppSync from "../services/apiClientAppSync";
import gql from "graphql-tag";

const updatePosition = gql`
    subscription OnPositionUpdated($screenId: ID!) {
        onPositionUpdated(screenId: $screenId) {
            playerId
            screenId
            angle
            color
        }
    }
`;

function makeSnake(data: any) {
    return <div style={{background: data.color, width: "30px", height: "30px"}}>{data.playerId}</div>
}

function Screen() {
    const [snakes, setSnakes] = useState({});
    const screenId = 'asdfsdfasdfsd';
    let players = {};
    useEffect(() => {
        const realtimeResults = (data: any) => {
            const position = data.data.onPositionUpdated;

            console.log('realtime data: ', position);
            setSnakes(prevState => {
                return {...prevState, [position.playerId]: makeSnake(position)}
            })
        };
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
                error: console.log,
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