import {COLUMNS, ROWS} from '../CONST';
import {IAllPositions, IPositionSchema} from '../interfaces/api';

export function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomRow() {
    return randomIntFromInterval(0, ROWS);
}

export function getRandomColumn() {
    return randomIntFromInterval(0, COLUMNS);
}

export function getOccupiedByPLayers(positions: IAllPositions, rowOrCol: ('row' | 'col')) {
    //todo can be a set
    return Object.values(positions).reduce((prev: (number)[], currentPositions: IPositionSchema[]) => {
        const currentRows = currentPositions.map((position: IPositionSchema) => position[rowOrCol]);
        return [...prev, ...currentRows];
    }, []);
}

export function getOccupiedByFood(foods: IPositionSchema[], rowOrCol: ('row' | 'col')) {
    // todo can be a set
    return foods.map((food) => food[rowOrCol]);
}

export function getUnoccupiedPosition(positions: IAllPositions, foods: IPositionSchema[]) {
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

export function bothArraysEqual(prevColors: string[], allColors: string[]) {
    //https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
    return prevColors.every(item => allColors.includes(item)) && allColors.every(item => prevColors.includes(item));
}