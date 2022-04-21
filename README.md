# 💻 Gamescreen for BiteMe

##BiteMe
BiteMe is a multiplayer snake game

## Start
`bash
npm start
`

## Basic design

## Tech stack
- React, Typescript

## Architecture
### States
#### Players
```ts
type TDirections = 'UP' | 'DOWN' | 'RIGHT' | 'LEFT';

interface IPlayerSchema {
    direction: TDirections,
    color: string,
    playerId: string,
    screenId: string,
    name: string,
    toGrow: number,
    __typename: string,
}

interface IRealTimeData {
    data: {
        onPositionUpdated: IPlayerSchema
    }
}
```

- stores all players that ever joined the game, does not delete the ones that died
- allows for them to rejoin without the need to refresh the controller (`playerId` stays the same);

#### Positions
```ts
export interface IPositionSchema {
    row: number,
    col: number,
}

export interface IAllPositions {
    [key: string] : IPositionSchema[],
}

```
- current version of 

## Rules
- amount of food will be always same or more than number of players
- minimal length of snakes is 3 cells

## Resources
- [inspiration for ticks](https://bookout.co.il/2020/07/16/cool-snake-with-react-hooks/)