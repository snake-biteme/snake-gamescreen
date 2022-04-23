import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {IAllPlayers, IAllPositions, IPositionSchema, IScores} from '../../interfaces/api';
import {COLUMNS, INACTIVE, MIN_LENGTH, ROWS, TICK} from '../../consts';
import Board from './components/Board/Board';
import NewPlayerLogic from './components/NewPlayerLogic';
import {bothArraysEqual, getUnoccupiedPosition, getUpdatedFood, updateDirection} from '../utils';
import styles from './Game.module.css';
import Scoreboard from './Scoreboard/Scoreboard';

function initialBoard() {
    const columns = new Array(COLUMNS).fill(null);
    return new Array(ROWS).fill([...columns]);
}

export interface IProps {
    setColors: Dispatch<SetStateAction<string[]>>,
}

function Game({setColors}: IProps) {
    const [counter, setCounter] = useState<number>(0);
    const [players, setPlayers] = useState<IAllPlayers>({});
    const [positions, setPositions] = useState<IAllPositions>({});
    const [foods, setFoods] = useState<IPositionSchema[]>([]);
    const [board, setBoard] = useState<(string | null)[][]>(initialBoard());
    const [scores, setScores] = useState<IScores>({});

    useEffect(() => {
        // tick logic, set counter to 1 at each tick
        const interval = setInterval(() => {
            setCounter(prev => prev + 1);
        }, TICK);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // if there are no players
        if (JSON.stringify(positions) === '{}') return;

        // todo positions vs players?
        const allColors = Object.values(players).reduce((acc: string[], player) => {
            acc.push(player.color);
            return acc;
        }, []);

        setColors(prevState => {
            if (!bothArraysEqual(prevState, allColors)) {
                return allColors;
            }
            return prevState;
        });

        const newPositions: IAllPositions = {};
        const eatenFood: IPositionSchema[] = [];
        // MOVE SNAKES
        for (const [id, snake] of Object.entries(positions)) {
            const currentPosition = [...snake.position];
            const currentHead = {...currentPosition[0]};
            const newHead: IPositionSchema = {...currentHead};
            // todo why is this being called when only dependent on counter?
            const updatedDirection = updateDirection(snake.prevDirection, players[id].direction);

            switch (players[id].direction) {
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

            const toBeCleared: (IPositionSchema | undefined)[] = [];

            //CHECK FOR COLLISIONS
            let collided = false;
            for (const snake of Object.values(positions)) {
                snake.position.forEach(cell => {
                    if (cell.row === newHead.row && cell.col === newHead.col) {
                        collided = true;
                        // todo instead of deleting turn it into food?
                        toBeCleared.push(...positions[id].position);

                        // deactive player status in scores
                        setScores(prev => {
                            return {...prev, [id]: {...prev[id], status: INACTIVE}};
                        });
                    }
                });
            }

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

                    setScores(prev => {
                        const addFoodCount = prev[id].food + 1;
                        return {...prev, [id]: {...prev[id], food: addFoodCount}};
                    });
                }
            }

            // if large enough or did not eat food - pop tail in positions
            if (currentPosition.length > MIN_LENGTH && ateFood === 'no') {
                toBeCleared.push(currentPosition.pop());
            }

            // save player to new positions if no collision detected
            if (!collided) {
                newPositions[id] = {
                    position: currentPosition,
                    prevDirection: updatedDirection,
                };
            }

            // CLEAR BOARD OF FOOD AND SNAKE BODY PARTS
            setBoard((prev: (string | null)[][]) => {
                const updated = [...prev];
                // clear tail and dead snakes from board
                toBeCleared.forEach(cell => {
                    if (cell) {
                        updated[cell.row][cell.col] = null;
                    }
                });
                //clear eaten food from board
                if (foodToClear) {
                    updated[foodToClear.row][foodToClear.col] = null;
                }
                return updated;
            });
        }

        // UPDATE FOOD
        // clear food that is eaten from food state
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
                position.position.forEach((oneCell => {
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


    return (
        <>
            <div className={styles.gameScreen}>
                <NewPlayerLogic setPlayers={setPlayers} setPositions={setPositions} setScores={setScores}
                    foods={foods}/>
                <Scoreboard scores={scores} players={players}/>
                <Board board={board} players={players}/>
            </div>
            <div>{counter}</div>
        </>

    );
}

export default Game;