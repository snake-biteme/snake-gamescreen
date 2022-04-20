import React, {useEffect} from 'react';
import {IAllPlayers, IAllPositions, IRealTimeData} from "../../../interfaces/api";
import apiClientAppSync from "../../../services/apiClientAppSync";
import {updatePosition} from "../../../services/graphql";
import {getRandomColumn, getRandomRow} from "../../utils";

interface IProps {
    setPlayers: Function,
    setPositions: Function,
    playerExists: Function,
}


function NewPlayerLogic({setPlayers, setPositions, playerExists}: IProps) {

    const screenId = 'asdfsdfasdfsd';


    useEffect(() => {
        const realtimeResults = (data: IRealTimeData) => {
            const position = data.data.onPositionUpdated;

            console.log('realtime data: ', position);
            setPlayers((prevState: IAllPlayers) => {
                return {...prevState, [position.playerId]: position};
            })

            if (!playerExists(position.playerId)) {
                const randomPosition = {
                    row: getRandomRow(),
                    col: getRandomColumn(),
                };

                setPositions((prevState: IAllPositions) => {
                    return {...prevState, [position.playerId]: [randomPosition]};
                });
            }
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
                error: console.error,
            });
        });
    }, [])
    return (
        <></>
    );
}

export default NewPlayerLogic;