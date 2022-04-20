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

        const position = data.data.onPositionUpdated;
        // console.log('realtime data: ', position);

        let allPlayers;
        setPlayers((prevState: IAllPlayers) => {
            allPlayers = prevState;
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
        console.log('RECEIVING SUBSCRIPTION')
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