export interface IPlayerSchema {
    direction: TDirections,
    color: string,
    playerId: string,
    screenId: string,
    name: string,
    toGrow?: number,
    __typename?: string,
}

export type TDirections = 'UP' | 'DOWN' | 'RIGHT' | 'LEFT';

export interface IRealTimeData {
    data: {
        onPositionUpdated: IPlayerSchema
    }
}

export interface IAllPlayers {
    [key: string]: IPlayerSchema,
}

export interface IPositionSchema {
    row: number,
    col: number,
}

export interface IAllPositions {
    [key: string]: {
        position: IPositionSchema[],
        prevDirection: TDirections,
    },
}

export interface IScore {
    food: number,
    status: boolean,
    highest: number,
}

export interface IScores {
    [key: string]: IScore,
}

export type TFood = 'apple' | 'banana' | 'cherries' | 'lemon' | 'mango' | 'orange' | 'pineapple' | 'watermelon'

export interface IFood {
    position: IPositionSchema,
    type: TFood,
}

export type TBoard = ({[key: string]:string } | string | null)[][]