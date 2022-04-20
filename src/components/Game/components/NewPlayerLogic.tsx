import React, {useEffect} from 'react';
import {IAllPlayers, IAllPositions, IRealTimeData} from "../../../interfaces/api";
import apiClientAppSync from "../../../services/apiClientAppSync";
import {updatePosition} from "../../../services/graphql";
import {getRandomColumn, getRandomRow} from "../../utils";

interface IProps {
    setPlayers: Function,
    setPositions: Function,
}


function NewPlayerLogic({setPlayers, setPositions}: IProps) {

    const screenId = 'asdfsdfasdfsd';

    const realtimeResults = (data: IRealTimeData) => {
        // console.log('SETTING PLAYERS AND STATE')
        const position = data.data.onPositionUpdated;
        // console.log('realtime data: ', position);

        let allPlayers;
        setPlayers((prevState: IAllPlayers) => {
            allPlayers = prevState;

            const previousDirection = prevState[position.playerId]?.direction;
            let updatedDirection = position.direction // new direction by default

            // snake can only go to three directions
            if (previousDirection === 'UP' && updatedDirection === 'DOWN') updatedDirection = 'UP';
            if (previousDirection === 'RIGHT' && updatedDirection === 'LEFT') updatedDirection = 'RIGHT';
            if (previousDirection === 'DOWN' && updatedDirection === 'UP') updatedDirection = 'DONW';
            if (previousDirection === 'LEFT' && updatedDirection === 'RIGHT') updatedDirection = 'LEFT';

            position.direction = updatedDirection

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