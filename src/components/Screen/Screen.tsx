import React, {useEffect, useState} from 'react';
import apiClientAppSync from "../../services/apiClientAppSync";
import {updatePosition} from "../../services/graphql";
import {IPositionSchema, IRealTimeData} from "../../interfaces/api";
import styles from './Screen.module.css'


function initialBoard() {
    const columns = new Array(COLUMNS).fill(null);
    return new Array(ROWS).fill([...columns]);
}

const COLUMNS = 10;
const ROWS = 3;
const TICK = 2000;

function Screen() {
    const [snakes, setSnakes] = useState<{ [key: string]: IPositionSchema }>({});
    const [board, setBoard] = useState<any>(initialBoard())
    const [HTMLBoard, setHTMLBoard] = useState<any>([])
    const [counter, setCounter] = useState<number>(0)
    const screenId = 'asdfsdfasdfsd';


    useEffect(() => {
        const interval = setInterval(() => {
            console.log('TICK');
            setCounter(prev => prev + 1);
            setBoard((prevBoard: any) => {
                const nextBoard = JSON.parse(JSON.stringify(prevBoard));
                for (let r = 0; r < ROWS; r++) {
                    for (let c = 0; c < COLUMNS; c++) {
                        const id = nextBoard[r][c]
                        if (id) {
                            console.log('FOUND ID', id, r, c)
                            // todo here to check the direction
                            nextBoard[r][c - 1] = id;
                            nextBoard[r][c] = null;
                        }
                    }
                }
                return nextBoard;
            })

        }, TICK);

        return () => clearInterval(interval);
    })

    useEffect(() => {
        const realtimeResults = (data: IRealTimeData) => {
            const position = data.data.onPositionUpdated;

            console.log('realtime data: ', position);
            setSnakes((prevState: { [key: string]: IPositionSchema }) => {
                return {...prevState, [position.playerId]: position}
            })

            const newBoard = JSON.parse(JSON.stringify(board));
            newBoard[1][9] = position.playerId;
            setBoard(newBoard)
        };

        const dummyData = {
            data: {
                onPositionUpdated: {
                    angle: 0,
                    color: '#980d0d',
                    playerId: '1111',
                    screenId: 'asdfsdfasdfsd',
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