import React, {useEffect, Dispatch, SetStateAction} from 'react';
import {
    IAllPlayers,
    IAllPositions,
    IFood,
    IRealTimeData,
    IScores,
} from '../../../interfaces/api';
import apiClientAppSync from '../../../services/apiClientAppSync';
import {updatePosition} from '../../../services/graphql';
import {ACTIVE, SCREEN_ID} from '../../../consts';
import {getUnoccupiedPosition, getUnoccupiedPositions} from '../GameLogic';
import * as amplitude from '@amplitude/analytics-browser';

interface IProps {
    // setState hook types: https://stackoverflow.com/a/56028976/18631517
    setPlayers: Dispatch<SetStateAction<IAllPlayers>>,
    setPositions: Dispatch<SetStateAction<IAllPositions>>,
    setScores: Dispatch<SetStateAction<IScores>>,
    foods: IFood[],
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
                amplitude.track('New player', {screenId: SCREEN_ID, playerId});
                const unoccupiedPositions = getUnoccupiedPositions(prevState, foods);
                const randomPosition = getUnoccupiedPosition(unoccupiedPositions);
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
            if (!prevState[playerId]) {
                const initialState = {
                    food: 0,
                    status: ACTIVE,
                    highest: 0,
                };
                return {...prevState, [playerId]: initialState};
            }

            if (!prevState[playerId].status) {
                const initialState = {
                    food: 0,
                    status: ACTIVE,
                    highest: prevState[playerId].highest,
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