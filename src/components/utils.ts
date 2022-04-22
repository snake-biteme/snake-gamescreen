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

export function rgbToHex(r: number, g: number, b: number) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        return r + ',' + g + ',' + b;//return 23,14,45 -> reformat if needed
    }
    return null;
}