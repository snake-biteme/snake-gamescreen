import React, {useEffect, Dispatch, SetStateAction} from 'react';
import {
    IAllPlayers,
    IAllPositions,
    IPositionSchema,
    IRealTimeData,
    IScores,
} from '../../../interfaces/api';
import apiClientAppSync from '../../../services/apiClientAppSync';
import {updatePosition} from '../../../services/graphql';
import {ACTIVE, SCREEN_ID} from '../../../consts';
import {getUnoccupiedPosition} from '../GameLogic';

interface IProps {
    // setState hook types: https://stackoverflow.com/a/56028976/18631517
    setPlayers: Dispatch<SetStateAction<IAllPlayers>>,
    setPositions: Dispatch<SetStateAction<IAllPositions>>,
    setScores: Dispatch<SetStateAction<IScores>>,
    foods: IPositionSchema[],
}

function NewPlayerLogic({setPlayers, setPositions, setScores, foods}: IProps) {

    const realtimeResults = (data: IRealTimeData) => {
        // updated position or new player
        const position = data.data.onPositionUpdated;

        const {playerId, direction} = position;

        // update players (add new, update position of previous)
        setPlayers((prevState: IAllPlayers) => {
            return {...prevState, [playerId]: position};
        });

        // generate random position for new players - checking if they exist
        setPositions((prevState: IAllPositions) => {
            if (!prevState[playerId]) {
                const randomPosition = getUnoccupiedPosition(prevState, foods);
                return {
                    ...prevState,
                    [playerId]: {
                        position: [randomPosition],
                        prevDirection: direction,
                    }
                };
            }
            return prevState;
        });

        // set initial food and status for new players OR reset for returning players (i.e. with status false)
        setScores((prevState: IScores) => {
            if (!prevState[playerId] || !prevState[playerId].status) {
                const initialState = {
                    food: 0,
                    status: ACTIVE,
                };
                return {...prevState, [playerId]: initialState};
            }
            return prevState;
        });
    };

    useEffect(() => {
        apiClientAppSync.hydrated().then((client) => {
            const observable = client.subscribe({
                query: updatePosition,
                variables: {
                    screenId: SCREEN_ID,
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