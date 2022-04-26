import React, {useEffect, useState} from 'react';
import {COLUMNS, FOODS, MIN_SIZE, ROWS} from '../../../../consts';
import styles from './Board.module.css';
import {IAllPlayers} from '../../../../interfaces/api';


interface IProps {
    board: (string|null)[][],
    players: IAllPlayers,
}

interface IStyle {
    minWidth: number,
    minHeight: number,
    backgroundColor?: string,
}

function Board({board, players} : IProps) {
    const [htmlBoard, setHTMLBoard] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const htmlBoardArr: JSX.Element[] = [];
        // loop through max number of rows
        for (let r = 0; r < ROWS; r++) {
            const row: JSX.Element[] = [];
            // loop through max number of cols
            for (let c = 0; c < COLUMNS; c++) {
                const columnKey = `C_${c}`;
                const customStyle: IStyle = {
                    minWidth: MIN_SIZE,
                    minHeight: MIN_SIZE,
                };
                let cellType = '';
                let foodType = '';

                //check if cell is occupied
                const occupied = board[r][c];
                if (occupied !== null) {
                    // by food
                    if (FOODS.includes(occupied)) {
                        cellType = 'foodCell';
                        foodType = occupied;
                    // by player
                    } else {
                        cellType = 'snakeCell';
                        customStyle['backgroundColor'] = players[occupied].color;
                    }
                }
                // add the div to the row
                row.push(<div key={columnKey} className={`${styles.cell} ${cellType !== '' ? styles[cellType] : ''} ${foodType !== '' ? styles[foodType] : ''}`} style={customStyle}/>);
            }
            const rowKey = `R_${r}`;
            // add all rows to complete the board
            htmlBoardArr.push(<div key={rowKey} className={styles.row}>{row}</div>);
        }
        setHTMLBoard(htmlBoardArr);

    }, [board]);
    return (
        <div className={styles.board}>
            {htmlBoard}
        </div>
    );
}

export default Board;