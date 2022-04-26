import React, {useEffect, useState} from 'react';
import {COLUMNS, MIN_SIZE, ROWS} from '../../../../consts';
import styles from './Board.module.css';
import {IAllPlayers, TBoard} from '../../../../interfaces/api';
import {pSBC} from '../../../utils';


interface IProps {
    board: TBoard,
    players: IAllPlayers,
}

interface IStyle {
    minWidth: number,
    minHeight: number,
    backgroundColor?: string,
    border?: string,
    boxShadow?: string,
    borderRadius?: string,
}

function Board({board, players}: IProps) {
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
                    if (typeof occupied === 'string') {
                        cellType = 'foodCell';
                        foodType = occupied;
                        // by player
                    } else {
                        const [id, bodyType] = Object.entries(occupied)[0];
                        let playerColor = players[id].color;

                        cellType = 'snakeCell';

                        if (bodyType === 'HEAD') {
                            playerColor = pSBC(0.3, playerColor, false, false);
                        }
                        customStyle['backgroundColor'] = playerColor;
                        customStyle['border'] = `1px solid ${playerColor}`;
                        customStyle['boxShadow'] = `0 1px 5px ${pSBC(-0.3, playerColor, false, true)}`;
                    }
                }
                // add the div to the row
                row.push(<div key={columnKey}
                    className={`${styles.cell} ${cellType !== '' ? styles[cellType] : ''} ${foodType !== '' ? styles[foodType] : ''}`}
                    style={customStyle}/>);
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