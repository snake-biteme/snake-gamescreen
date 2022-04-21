import React, {useEffect} from 'react';
import {IAllPlayers, IAllPositions, IRealTimeData, TDirections} from "../../../interfaces/api";
import apiClientAppSync from "../../../services/apiClientAppSync";
import {updatePosition} from "../../../services/graphql";
import {getRandomColumn, getRandomRow} from "../../utils";

interface IProps {
    setPlayers: Function,
    setPositions: Function,
}

function updateDirection(previousDirection: TDirections, newDirection: TDirections) {
    let updatedDirection = newDirection // new direction by default

    // snake can only go to three directions, i.e. if going UP cannot go DOWN
    if (previousDirection === 'UP' && updatedDirection === 'DOWN') updatedDirection = 'UP';
    if (previousDirection === 'RIGHT' && updatedDirection === 'LEFT') updatedDirection = 'RIGHT';
    if (previousDirection === 'DOWN' && updatedDirection === 'UP') updatedDirection = 'DOWN';
    if (previousDirection === 'LEFT' && updatedDirection === 'RIGHT') updatedDirection = 'LEFT';

    return updatedDirection
}


function NewPlayerLogic({setPlayers, setPositions}: IProps) {

    const screenId = 'asdfsdfasdfsd';

    const realtimeResults = (data: IRealTimeData) => {
        // new position or new player info
        const position = data.data.onPositionUpdated;
        // console.log('realtime data: ', position);

        let allPlayers;
        // update players (add new, update position of previous)
        setPlayers((prevState: IAllPlayers) => {
            // saving most current state of players
            allPlayers = prevState;

            // check if invalid direction
            const previousDirection = prevState[position.playerId]?.direction;
            position.direction = updateDirection(previousDirection, position.direction)

            return {...prevState, [position.playerId]: position};
        })

        // generate random position for new players - checking if they exist
        if (!(allPlayers ? allPlayers[position.playerId] : true)) {
            const randomPosition = {
                row: getRandomRow(),
                col: getRandomColumn(),
            };

            setPositions((prevState: IAllPositions) => {
                return {...prevState, [position.playerId]: [randomPosition]};
            });
        }
    };


    useEffect(() => {
        // console.log('RECEIVING SUBSCRIPTION')
        apiClientAppSync.hydrated().then((client) => {
            const observable = client.subscribe({
                query: updatePosition,
                variables: {
                    screenId: screenId,
                }
            });
            // run realtime results once received new subscription, i.e. new player or new directions
            observable.subscribe({
                next: realtimeResults,
                complete: console.log,
                error: console.error,
            });
        });
    }, [])
    return (
        <></>
    );
}

export default NewPlayerLogic;