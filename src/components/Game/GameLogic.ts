import {IAllPlayers, IAllPositions, IPositionSchema, TDirections} from '../../interfaces/api';
import {getRandomColumn, getRandomRow} from '../utils';
import {COLUMNS, ROWS} from '../../consts';

export function getOccupiedByPLayers(positions: IAllPositions, rowOrCol: ('row' | 'col')): number[] {
    //todo can be a set
    return Object.values(positions).reduce((prev: (number)[], currentPositions) => {
        const currentRows = currentPositions.position.map((position: IPositionSchema) => position[rowOrCol]);
        return [...prev, ...currentRows];
    }, []);
}

export function getOccupiedByFood(foods: IPositionSchema[], rowOrCol: ('row' | 'col')): number[] {
    // todo can be a set
    return foods.map((food) => food[rowOrCol]);
}

export function getUnoccupiedPosition(positions: IAllPositions, foods: IPositionSchema[]): IPositionSchema {
    // check that new random position is not clashing with existing players or food
    let randomRow = getRandomRow();
    const occupiedPlayerRows = getOccupiedByPLayers(positions, 'row');
    const occupiedFoodRows = getOccupiedByFood(foods, 'row');
    const allOccupiedRows = [...occupiedPlayerRows, ...occupiedFoodRows];
    while (allOccupiedRows.includes(randomRow)) {
        randomRow = getRandomRow();
    }

    let randomCol = getRandomColumn();
    const occupiedPlayerCols = getOccupiedByPLayers(positions, 'col');
    const occupiedFoodCols = getOccupiedByFood(foods, 'col');
    const allOccupiedCols = [...occupiedPlayerCols, ...occupiedFoodCols];
    while (allOccupiedCols.includes(randomCol)) {
        randomCol = getRandomColumn();
    }

    return {
        row: randomRow,
        col: randomCol
    };
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
