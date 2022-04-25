import {IAllPlayers, IAllPositions, IPositionSchema, TDirections} from '../../interfaces/api';
import {randomIntFromInterval} from '../utils';
import {COLUMNS, ROWS} from '../../consts';

export function isPositionOccupied(positionToCheck: IPositionSchema, positions: IAllPositions, foods: IPositionSchema[]): boolean {
    for (const snake of Object.values(positions)) {
        for (const cell of snake.position) {
            if (positionToCheck.row === cell.row && positionToCheck.col === cell.col) return true;
        }
    }

    for (const food of foods) {
        if (positionToCheck.row === food.row && positionToCheck.col === food.col) return true;
    }
    return false;
}

export function getUnoccupiedPosition(positions: IAllPositions, foods: IPositionSchema[]): IPositionSchema {
    // generate all possible coordinates for rows and columns
    const allUnoccupiedPositions = [];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLUMNS; c++) {
            const position = {
                row: r,
                col: c,
            };
            // check if any of them clash with the current position of players or foods
            if (!isPositionOccupied(position, positions, foods)) {
                allUnoccupiedPositions.push(position);
            }
        }
    }

    // get a random position from unoccupied positions
    const randomIndex = randomIntFromInterval(0, allUnoccupiedPositions.length);
    return allUnoccupiedPositions[randomIndex];
}

export function getAllColors(players: IAllPlayers): string[] {
    return Object.values(players).reduce((acc: string[], player) => {
        acc.push(player.color);
        return acc;
    }, []);
}

export function getUpdatedFood(foods: IPositionSchema[], eatenFood: IPositionSchema[]): IPositionSchema[] {
    const updatedFood: IPositionSchema[] = [];

    for (const food of foods) {
        for (const eaten of eatenFood) {
            if (food.row !== eaten.row && food.col !== eaten.row) {
                updatedFood.push(food);
            }
        }
    }

    return updatedFood;
}

export function updateDirection(previousDirection: TDirections, newDirection: TDirections): TDirections {

    let updatedDirection = newDirection; // new direction by default

    // snake can only go to three directions, i.e. if going UP cannot go DOWN
    if (previousDirection === 'UP' && updatedDirection === 'DOWN') updatedDirection = 'UP';
    if (previousDirection === 'RIGHT' && updatedDirection === 'LEFT') updatedDirection = 'RIGHT';
    if (previousDirection === 'DOWN' && updatedDirection === 'UP') updatedDirection = 'DOWN';
    if (previousDirection === 'LEFT' && updatedDirection === 'RIGHT') updatedDirection = 'LEFT';

    return updatedDirection;
}

export function getNewHead(currentHead: IPositionSchema, updatedDirection: TDirections): IPositionSchema {
    const newHead: IPositionSchema = {...currentHead};

    switch (updatedDirection) {
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

    return newHead;
}
