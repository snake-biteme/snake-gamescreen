export interface IPositionSchema {
    angle: number,
    color: string,
    playerId: string,
    screenId: string,
    __typename: string
}

export interface IRealTimeData {
    data: {
        onPositionUpdated: IPositionSchema
    }
}