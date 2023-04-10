import {dropPosition, getUnoccupiedPositions} from './GameLogic';
import {IAllPositions, IFood, IPositionSchema} from '../../interfaces/api';

let dummyPositions: IPositionSchema[];
let dummyFood: IFood[];
let dummySnakes: IAllPositions;

jest.mock('../../consts', () => ({
    COLUMNS: 3,
    ROWS: 3,
}));
beforeEach(() => {
    dummyPositions = [
        {row: 1, col: 2},
        {row: 2, col: 2},
        {row: 2, col: 4},
    ];

    dummySnakes = {
        a: {
            position: [
                {row: 1, col: 2},
                {row: 2, col: 2},
                {row: 1, col: 1},
            ],
            prevDirection: 'DOWN'
        }
    };
    dummyFood = [
        {
            position: {row: 2, col: 1},
            type: 'apple'
        },
        {
            position: {row:  0, col: 2},
            type: 'pineapple'
        },
    ];
});
test('should get unoccupied positions', () => {
    const actual = getUnoccupiedPositions(dummySnakes, dummyFood);
    expect(actual.length).toBe(4);
});
test('should drop position', () => {
    const positionToDrop = {row: 2, col: 2};

    const actual = dropPosition(positionToDrop, dummyPositions);
    expect(actual).toStrictEqual([
        {row: 1, col: 2},
        {row: 2, col: 4},
    ]);
});
