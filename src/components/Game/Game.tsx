import React, {useEffect, useState} from 'react';
import {IAllPlayers, IAllPositions, IPositionSchema} from '../../interfaces/api';
import {COLUMNS, MIN_LENGTH, ROWS, TICK} from '../../CONST';
import Board from './components/Board/Board';
import NewPlayerLogic from './components/NewPlayerLogic';
import {getUnoccupiedPosition, getUpdatedFood} from '../utils';

function initialBoard() {
    const columns = new Array(COLUMNS).fill(null);
    return new Array(ROWS).fill([...columns]);
}

function Game() {
    const [players, setPlayers] = useState<IAllPlayers>({});
    const [positions, setPositions] = useState<IAllPositions>({});
    const [foods, setFoods] = useState<IPositionSchema[]>([]);
    const [board, setBoard] = useState<(string|null)[][]>(initialBoard());
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        // if there are no players
        if (JSON.stringify(positions) === '{}') return;

        const newPositions: IAllPositions = {};
        const eatenFood: IPositionSchema[] = [];
        // MOVE SNAKES
        for (const [id, snake] of Object.entries(players)) {
            const currentPosition = [...positions[id]];
            const currentHead = {...currentPosition[0]};
            const newHead: IPositionSchema = {...currentHead};
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

            // add a new head
            currentPosition.unshift(newHead);

            // drop tail if min length
            let toBeCleared: IPositionSchema | undefined;

            // ANY FOOD EATEN?
            let foodToClear: IPositionSchema | undefined;
            let ateFood = 'no';
            for (const food of foods) {
                // check if head will collide with food
                if (newHead.col === food.col && newHead.row === food.row) {
                    ateFood = 'yes';
                    foodToClear = {
                        row: food.row,
                        col: food.col,
                    };

                    eatenFood.push(foodToClear);
                }
            }

            // if too small or did not eat food - pop tail in positions
            if (currentPosition.length > MIN_LENGTH && ateFood === 'no') {
                toBeCleared = currentPosition.pop();
            }

            // save to new state
            newPositions[id] = currentPosition;

            setBoard((prev: (string|null)[][]) => {
                const updated = [...prev];
                // clear tail from board
                if (toBeCleared) {
                    updated[toBeCleared.row][toBeCleared.col] = null;
                }
                //clear eaten food from board
                if (foodToClear) {
                    updated[foodToClear.row][foodToClear.col] = null;
                }
                return updated;
            });
        }


        // UPDATE FOOD
        // clear food that is eaten
        const newFoods = eatenFood.length > 0 ? getUpdatedFood(foods, eatenFood) : foods;
        // generate additional food
        const foodToAdd = Object.keys(newPositions).length - newFoods.length;

        // const newFood: IPositionSchema[] = []
        for (let i = 0; i < foodToAdd; i++) {
            const foodPosition = getUnoccupiedPosition(positions, foods);
            newFoods.push(foodPosition);
        }

        setFoods(newFoods);

        setPositions(newPositions);


    }, [counter]);

    useEffect(() => {
        // create a copy of current board
        const newBoard = JSON.parse(JSON.stringify(board));
        if (Object.keys(positions).length > 0) {
            // set all snakes to board
            for (const [id, position] of Object.entries(positions)) {
                position.forEach((oneCell => {
                    newBoard[oneCell.row][oneCell.col] = id;
                }));
            }

            // set all food to board
            for (const food of foods) {
                newBoard[food.row][food.col] = 'FOOD';
            }

            setBoard(newBoard);
        }
    }, [positions, foods]);

    useEffect(() => {
        // tick logic, set counter to 1 at each tick
        const interval = setInterval(() => {
            setCounter(prev => prev + 1);
        }, TICK);
        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            Game
            <NewPlayerLogic setPlayers={setPlayers} setPositions={setPositions}/>
            <Board board={board} players={players}/>
            <div>{counter}</div>
        </div>

    );
}

export default Game;