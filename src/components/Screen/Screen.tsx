import React, {useEffect, useState} from 'react';
import apiClientAppSync from "../../services/apiClientAppSync";
import {updatePosition} from "../../services/graphql";
import {IAllPlayers, IAllPositions, IPlayerSchema, IPositionSchema, IRealTimeData} from "../../interfaces/api";
import styles from './Screen.module.css'


function initialBoard() {
    const columns = new Array(COLUMNS).fill(null);
    return new Array(ROWS).fill([...columns]);
}

const COLUMNS = 8;
const ROWS = 3;
const TICK = 1000;

function Screen() {
    const [snakes, setSnakes] = useState<IAllPlayers>({});
    const [positions, setPositions] = useState<IAllPositions>({});
    const [board, setBoard] = useState<any>(initialBoard())
    const [HTMLBoard, setHTMLBoard] = useState<any>([])
    const [counter, setCounter] = useState<number>(0)
    const screenId = 'asdfsdfasdfsd';

    const UP = 1;
    const DOWN = 2;
    const LEFT = 3;
    const RIGHT = 4;

    // move snake positions
    useEffect(() => {
        const interval = setInterval(() => {
            // setBoard([...initialBoard()]);
            setCounter(prev => prev + 1);

            if (positions === {}) return;

            const newPositions: IAllPositions = {}

            for (const [id, snake] of Object.entries(snakes)) {
                if (snake.direction === 3) {
                    const currentPosition = [...positions[id]]
                    const currentHead = {...currentPosition[0]}

                    const newCol = currentHead.col === 0 ? COLUMNS - 1 : currentHead.col - 1;

                    currentPosition.unshift({
                        row: currentHead.row,
                        col: newCol,
                    });

                    const toBeCleared = currentPosition.pop();
                    setBoard((prev: any) => {
                       return [...prev, prev[toBeCleared!.row][toBeCleared!.col] = null];
                    })

                    newPositions[id] = currentPosition;
                }
            }

            setPositions(newPositions);
        }, TICK);

        return () => clearInterval(interval);
    });

    // save new player
    useEffect(() => {
        const realtimeResults = (data: IRealTimeData) => {
            const position = data.data.onPositionUpdated;

            console.log('realtime data: ', position);
            setSnakes((prevState: IAllPlayers) => {
                return {...prevState, [position.playerId]: position}
            })

            const randomPosition = {
                row: 1,
                col: 9,
            }

            setPositions((prevState: IAllPositions) => {
                return {...prevState, [position.playerId]: [randomPosition]}
            })
        };

        const dummyData = {
            data: {
                onPositionUpdated: {
                    angle: 0,
                    color: '#980d0d',
                    playerId: '1111',
                    screenId: 'asdfsdfasdfsd',
                    direction: 3,
                    __typename: 'Position'
                }
            }
        }

        realtimeResults(dummyData)

        // apiClientAppSync.hydrated().then((client) => {
        //     const observable = client.subscribe({
        //         query: updatePosition,
        //         variables: {
        //             screenId: screenId,
        //         }
        //     });
        //
        //     observable.subscribe({
        //         next: realtimeResults,
        //         complete: console.log,
        //         error: console.error,
        //     });
        // });
    }, [])

    // get players on board
    useEffect(() => {
        const newBoard = JSON.parse(JSON.stringify(board));

        for (const [id, position] of Object.entries(positions)) {
            newBoard[position[0].row][position[0].col] = id;
        }

        setBoard(newBoard)

    }, [positions])

    // render board
    useEffect(() => {
        // console.log(board);
        const htmlBoard = []
        for (let r = 0; r < ROWS; r++) {
            const row = []
            for (let c = 0; c < COLUMNS; c++) {
                const columnKey = `C_${c}`
                let colorStyle = {};
                if (board[r][c]) {
                    colorStyle = {backgroundColor: snakes[board[r][c]].color}
                }

                row.push(<div key={columnKey} className={styles.cell} style={colorStyle}/>)
            }
            const rowKey = `R_${r}`
            htmlBoard.push(<div key={rowKey} className={styles.row}>{row}</div>)
        }
        setHTMLBoard(htmlBoard);

    }, [board])


    return (
        <div>
            Game
            {HTMLBoard}
            <div>{counter}</div>
        </div>

    );
}

export default Screen;