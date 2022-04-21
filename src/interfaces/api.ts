export interface IPlayerSchema {
    direction: TDirections,
    color: string,
    playerId: string,
    screenId: string,
    name: string,
    toGrow: number,
    __typename: string,
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
    [key: string] : IPositionSchema[],
}
