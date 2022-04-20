import React, {useEffect} from 'react';
import {IAllPlayers, IAllPositions, IRealTimeData} from "../../../interfaces/api";
import apiClientAppSync from "../../../services/apiClientAppSync";
import {updatePosition} from "../../../services/graphql";

interface IProps {
    setSnakes: Function,
    setPositions: Function,
}

function NewPlayerLogic({setSnakes, setPositions} : IProps) {

    const screenId = 'asdfsdfasdfsd';

    useEffect(() => {
        const realtimeResults = (data: IRealTimeData) => {
            const position = data.data.onPositionUpdated;
            position.direction = position.angle === 0 ? 4 : position.angle

            setSnakes((prevState: IAllPlayers) => {
                return {...prevState, [position.playerId]: position};
            })

            // todo make this better, rely on board not angle
            if (position.angle === 0) {
                const randomPosition = {
                    row: 4,
                    col: 2,
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