import React, {useEffect, useState} from 'react';
import {IAllPlayers, IAllPositions, IFood, IPositionSchema, IScores, TBoard} from '../../interfaces/api';
import {COLUMNS, FOOD_COEFFICIENT, INACTIVE, MIN_LENGTH, ROWS, TICK} from '../../consts';
import Board from './components/Board/Board';
import NewPlayerLogic from './components/NewPlayerLogic';
import styles from './Game.module.css';
import Scoreboard from './Scoreboard/Scoreboard';
import {getNewHead, getRandomFood, getUnoccupiedPosition, getUpdatedFood, updateDirection} from './GameLogic';

function initialBoard() {
    const columns = new Array(COLUMNS).fill(null);
    return new Array(ROWS).fill([...columns]);
}

function Game() {
    const [counter, setCounter] = useState<number>(0);
    const [players, setPlayers] = useState<IAllPlayers>({});
    const [positions, setPositions] = useState<IAllPositions>({});
    const [foods, setFoods] = useState<IFood[]>([]);
    const [board, setBoard] = useState<TBoard>(initialBoard());
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

        const newPositions: IAllPositions = {};
        const eatenFood: IPositionSchema[] = [];
        // MOVE SNAKES
        // for each snake...
        for (const [id, snake] of Object.entries(positions)) {
            // copy its current position so we can update it
            const currentPosition = [...snake.position];
            // get its current head
            const currentHead = {...currentPosition[0]};

            // check if move is valid - can only move to three directions, if not valid keep the previous direction (not the last valid direction sent)
            const updatedDirection = updateDirection(snake.prevDirection, players[id].direction);

            // get the position of new head
            const newHead: IPositionSchema = getNewHead(currentHead, updatedDirection);

            // add a new head
            currentPosition.unshift(newHead);

            //CHECK FOR COLLISIONS
            const toBeCleared: (IPositionSchema | undefined)[] = [];

            let collided = false;
            // check against every snake, including itself but without the tail!
            const positionsToCheck = {...positions};
            positionsToCheck[id].position.pop();

            for (const snake of Object.values(positionsToCheck)) {
                snake.position.forEach(cell => {
                    if (cell.row === newHead.row && cell.col === newHead.col) {
                        collided = true;
                        // todo instead of deleting turn it into food?
                        toBeCleared.push(...positions[id].position);

                        // deactivate player status in scores
                        setScores(prev => {
                            return {...prev, [id]: {...prev[id], status: INACTIVE}};
                        });
                    }
                });
            }

            // ANY FOOD EATEN?
            let foodToClear: IPositionSchema | undefined;
            let ateFood = false;
            for (const food of foods) {
                // check if head will collide with food
                if (newHead.col === food.position.col && newHead.row === food.position.row) {
                    ateFood = true;
                    foodToClear = {
                        row: food.position.row,
                        col: food.position.col,
                    };

                    eatenFood.push(foodToClear);

                    setScores(prev => {
                        const addFoodCount = prev[id].food + 1;
                        return {...prev, [id]: {...prev[id], food: addFoodCount}};
                    });
                }
            }

            // if large enough or did not eat food - pop tail in positions - this allows for the snake to "move" rather than grow infinitelly
            if (currentPosition.length > MIN_LENGTH && !ateFood) {
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
            setBoard(prev => {
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
        const newFoods = eatenFood.length > 0 ? getUpdatedFood(foods, eatenFood) : [...foods];
        // generate additional food
        const foodToAdd = Math.floor((Object.keys(newPositions).length - newFoods.length) + (Object.keys(newPositions).length * FOOD_COEFFICIENT));
        // const newFood: IPositionSchema[] = []
        for (let i = 0; i < foodToAdd; i++) {
            const foodPosition = getUnoccupiedPosition(positions, foods);
            const newFood = {
                position: foodPosition,
                type: getRandomFood(),
            };
            newFoods.push(newFood);
        }

        setFoods(newFoods);

        setPositions(newPositions);

    }, [counter]);

    useEffect(() => {
        // create a copy of current board
        const newBoard: TBoard = JSON.parse(JSON.stringify(board));
        if (Object.keys(positions).length > 0) {
            // set all snakes to board
            for (const [id, position] of Object.entries(positions)) {
                position.position.forEach(((oneCell, index) => {
                    if (index === 0) {
                        newBoard[oneCell.row][oneCell.col] = {[id]: 'HEAD'};
                    } else {
                        newBoard[oneCell.row][oneCell.col] = {[id]: 'BODY'};
                    }
                }));
            }

            // set all foods to board
            for (const food of foods) {
                newBoard[food.position.row][food.position.col] = food.type;
            }

            setBoard(newBoard);
        }
    }, [positions, foods]);


    return (
        <div className={styles.gameScreen}>
            <NewPlayerLogic setPlayers={setPlayers} setPositions={setPositions} setScores={setScores}
                foods={foods}/>
            <Scoreboard scores={scores} players={players}/>
            <Board board={board} players={players}/>
        </div>
    );
}

export default Game;