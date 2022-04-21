import React, {useEffect, useState} from 'react';
import {COLUMNS, ROWS} from "../../../../CONST";
import styles from "./Board.module.css";
import {IAllPlayers} from "../../../../interfaces/api";

interface IProps {
    board: any,
    players: IAllPlayers,
}


function Board({board, players} : IProps) {
    const [htmlBoard, setHTMLBoard] = useState([])

    useEffect(() => {
        // console.log('HTML BOARD')
        const htmlBoardArr: any = [];
        // loop through max number of rows
        for (let r = 0; r < ROWS; r++) {
            const row: any = [];
            // loop through max number of cols
            for (let c = 0; c < COLUMNS; c++) {
                const columnKey = `C_${c}`;
                let colorStyle = {};
                let cellType = ''

                //check if cell is occupied
                const occupied = board[r][c]
                if (occupied) {
                    // by food or player
                    if (occupied === 'FOOD') {
                        cellType = 'foodCell'

                    } else {
                        cellType = 'snakeCell'
                        colorStyle = {backgroundColor: players[board[r][c]].color};
                    }
                }
                // add the div to the row
                row.push(<div key={columnKey} className={`${styles.cell} ${styles[cellType]}`} style={colorStyle}/>);
            }
            const rowKey = `R_${r}`
            // add all rows to complete the board
            htmlBoardArr.push(<div key={rowKey} className={styles.row}>{row}</div>);
        }
        setHTMLBoard(htmlBoardArr);

    }, [board]);
    return (
        <div>
            {htmlBoard}
        </div>
    );
}

export default Board;