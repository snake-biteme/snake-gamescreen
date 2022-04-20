import React, {useEffect, useState} from 'react';
import apiClientAppSync from "../../services/apiClientAppSync";
import {updatePosition} from "../../services/graphql";
import {IAllPlayers, IAllPositions, IPositionSchema, IRealTimeData} from "../../interfaces/api";
import {COLUMNS, ROWS, TICK} from "../../CONST";
import {getRandomColumn, getRandomRow} from "../utils";
import Board from "./components/Board/Board";


function initialBoard() {
    const columns = new Array(COLUMNS).fill(null);
    return new Array(ROWS).fill([...columns]);
}

function Game() {
    const [snakes, setSnakes] = useState<IAllPlayers>({});
    const [positions, setPositions] = useState<IAllPositions>({});
    const [board, setBoard] = useState<any>(initialBoard());
    const [counter, setCounter] = useState<number>(0);
    const screenId = 'asdfsdfasdfsd';


    // const UP = 1;
    // const DOWN = 2;
    // const LEFT = 3;
    // const RIGHT = 4;

    // move snake positions
    useEffect(() => {
            const interval = setInterval(() => {
                setCounter(prev => prev + 1);

                if (positions === {}) return;

                const newPositions: IAllPositions = {};

                for (const [id, snake] of Object.entries(snakes)) {
                    const currentPosition = [...positions[id]];
                    const currentHead = {...currentPosition[0]};
                    const newHead: IPositionSchema = {...currentHead}
                    switch (snake.direction) {
                        case 0:
                            break;
                        case 1:
                            newHead.row = currentHead.row === 0 ? ROWS - 1 : currentHead.row - 1;
                            break;
                        case 2:
                            newHead.row = currentHead.row === ROWS - 1 ? 0 : currentHead.row + 1;
                            break;
                        case 3:
                            newHead.col = currentHead.col === 0 ? COLUMNS - 1 : currentHead.col - 1;
                            break;
                        case 4:
                            newHead.col = currentHead.col === COLUMNS - 1 ? 0 : currentHead.col + 1;
                            break;
                    }
                    currentPosition.unshift(newHead);
                    const toBeCleared = currentPosition.pop();
                    newPositions[id] = currentPosition;
                    setBoard((prev: any) => {
                        if (toBeCleared) {
                            return [...prev, prev[toBeCleared.row][toBeCleared.col] = null];
                        }
                    })
                }
                setPositions(newPositions);

            }, TICK);

            return () => clearInterval(interval);
        }, []
    );

// new player and directions
    useEffect(() => {
        const realtimeResults = (data: IRealTimeData) => {
            const position = data.data.onPositionUpdated;
            position.direction = position.angle === 0 ? 4 : position.angle

            console.log('realtime data: ', position);
            setSnakes((prevState: IAllPlayers) => {
                return {...prevState, [position.playerId]: position};
            })

            // todo make this better, rely on board not angle
            if (position.angle === 0) {
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

// get players on board
    useEffect(() => {
        const newBoard = JSON.parse(JSON.stringify(board));
        if (Object.keys(positions).length > 0) {

            for (const [id, position] of Object.entries(positions)) {
                newBoard[position[0].row][position[0].col] = id;
            }
            setBoard(newBoard);
        }


    }, [positions]);

    return (
        <div>
            Game
            <Board board={board} snakes={snakes}/>
            <div>{counter}</div>
        </div>

    );
}

export default Game;