import React, {useEffect, Dispatch, SetStateAction} from 'react';
import {IAllPlayers, IAllPositions, IRealTimeData, TDirections} from '../../../interfaces/api';
import apiClientAppSync from '../../../services/apiClientAppSync';
import {updatePosition} from '../../../services/graphql';
import {getRandomColumn, getRandomRow} from '../../utils';

interface IProps {
    // setState hook types: https://stackoverflow.com/a/56028976/18631517
    setPlayers: Dispatch<SetStateAction<IAllPlayers>>,
    setPositions: Dispatch<SetStateAction<IAllPositions>>,
    screenId: string
}

function updateDirection(previousDirection: TDirections, newDirection: TDirections) {
    let updatedDirection = newDirection; // new direction by default

    // snake can only go to three directions, i.e. if going UP cannot go DOWN
    if (previousDirection === 'UP' && updatedDirection === 'DOWN') updatedDirection = 'UP';
    if (previousDirection === 'RIGHT' && updatedDirection === 'LEFT') updatedDirection = 'RIGHT';
    if (previousDirection === 'DOWN' && updatedDirection === 'UP') updatedDirection = 'DOWN';
    if (previousDirection === 'LEFT' && updatedDirection === 'RIGHT') updatedDirection = 'LEFT';

    return updatedDirection;
}

function playerExists(allPlayers: IAllPlayers | IAllPositions, playerId: string) {
    if (allPlayers) {
        return allPlayers[playerId];
    }
}


function NewPlayerLogic({setPlayers, setPositions, screenId}: IProps) {
    // todo swap with screenId from props
    const screenID = 'asdfsdfasdfsd';

    const realtimeResults = (data: IRealTimeData) => {
        // updated position or new player
        const position = data.data.onPositionUpdated;

        // update players (add new, update position of previous)
        setPlayers((prevState: IAllPlayers) => {

            // check if invalid direction
            const previousDirection = prevState[position.playerId]?.direction;
            position.direction = updateDirection(previousDirection, position.direction);

            return {...prevState, [position.playerId]: position};
        });

        // generate random position for new players - checking if they exist
        setPositions((prevState: IAllPositions) => {
            if (!playerExists(prevState, position.playerId)) {
                const randomPosition = {
                    row: getRandomRow(),
                    col: getRandomColumn(),
                };
                return {...prevState, [position.playerId]: [randomPosition]};
            }
            return prevState;
        });
    };


    useEffect(() => {
        apiClientAppSync.hydrated().then((client) => {
            const observable = client.subscribe({
                query: updatePosition,
                variables: {
                    screenId: screenID,
                }
            });
            // run realtime results once received new subscription, i.e. new player or new directions
            observable.subscribe({
                next: realtimeResults,
                complete: console.log,
                error: console.error,
            });
        });
    }, []);
    return (
        <></>
    );
}

export default NewPlayerLogic;