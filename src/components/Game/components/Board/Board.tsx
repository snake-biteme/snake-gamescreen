import React, {useEffect, useState} from 'react';
import {COLUMNS, ROWS} from "../../../../CONST";
import styles from "./Board.module.css";
import {IAllPlayers} from "../../../../interfaces/api";

interface IProps {
    board: any,
    snakes: IAllPlayers,
}


function Board({board, snakes} : IProps) {
    const [htmlBoard, setHTMLBoard] = useState([])

    useEffect(() => {
        // console.log('HTML BOARD')
        const htmlBoardArr: any = [];
        for (let r = 0; r < ROWS; r++) {
            const row: any = [];
            for (let c = 0; c < COLUMNS; c++) {
                const columnKey = `C_${c}`;
                let colorStyle = {};
                if (board[r][c]) {
                    colorStyle = {backgroundColor: snakes[board[r][c]].color};
                }

                row.push(<div key={columnKey} className={styles.cell} style={colorStyle}>{snakes[board[r][c]]?.name}</div>);
            }
            const rowKey = `R_${r}`
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