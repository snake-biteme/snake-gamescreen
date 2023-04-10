import {dropPosition} from './GameLogic';
test('should drop position', () => {
    const positions = [
        {row: 1, col: 2},
        {row: 2, col: 2},
        {row: 2, col: 4},
    ];

    const positionToDrop = {row: 2, col: 2};

    const actual = dropPosition(positionToDrop, positions);
    expect(actual).toStrictEqual([
        {row: 1, col: 2},
        {row: 2, col: 4},
    ]);
});
