export interface IPlayerSchema {
    direction: string,
    color: string,
    playerId: string,
    screenId: string,
    name: string,
    __typename: string,
}

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
