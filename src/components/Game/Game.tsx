import React, {useEffect, useState} from 'react';
import {IAllPlayers, IAllPositions, IPositionSchema} from "../../interfaces/api";
import {COLUMNS, ROWS, TICK} from "../../CONST";
import Board from "./components/Board/Board";
import NewPlayerLogic from "./components/NewPlayerLogic";


function initialBoard() {
    const columns = new Array(COLUMNS).fill(null);
    return new Array(ROWS).fill([...columns]);
}

function Game() {
    const [players, setPlayers] = useState<IAllPlayers>({});
    const [positions, setPositions] = useState<IAllPositions>({});
    const [board, setBoard] = useState<any>(initialBoard());
    const [counter, setCounter] = useState<number>(0);

    // move snake positions
    useEffect(() => {
        // console.log('SETTING INTERVAL')
        const interval = setInterval(() => {
            setCounter(prev => prev + 1);

            if (JSON.stringify(positions) === '{}') return;

            const newPositions: IAllPositions = {};
            // console.log('MOVING SNAKES', players)
            for (const [id, snake] of Object.entries(players)) {
                const currentPosition = [...positions[id]];
                const currentHead = {...currentPosition[0]};
                const newHead: IPositionSchema = {...currentHead}
                switch (snake.direction) {
                    case 'UP':
                        newHead.row = currentHead.row === 0 ? ROWS - 1 : currentHead.row - 1;
                        break;
                    case 'DOWN':
                        newHead.row = currentHead.row === ROWS - 1 ? 0 : currentHead.row + 1;
                        break;
                    case 'LEFT':
                        newHead.col = currentHead.col === 0 ? COLUMNS - 1 : currentHead.col - 1;
                        break;
                    case 'RIGHT':
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
            // console.log('FINISHED INTERVAL')

        }, TICK);
        return () => clearInterval(interval);
    }, [positions]);

// get players on board
    useEffect(() => {
        // console.log('PLAYERS ON BOARD', players)
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
            <NewPlayerLogic setPlayers={setPlayers} setPositions={setPositions}/>
            <Board board={board} snakes={players}/>
            <div>{counter}</div>
        </div>

    );
}

export default Game;