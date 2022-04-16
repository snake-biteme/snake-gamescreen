export interface IPlayerSchema {
    angle: number,
    color: string,
    playerId: string,
    screenId: string,
    __typename: string,
    direction: number,

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
