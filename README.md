# 💻 Gamescreen for BiteMe

##BiteMe
BiteMe is a multiplayer snake game.
It is a share screen type of game.

## Start
`bash
npm start
`

## Basic design

## Tech stack
- React, Typescript

## Architecture

### States

#### Counter
- type: `number`
- ensures that the game renders at each tick rather than at change of other states
- 

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
- most up-to-date position of all active players and the snakes
- snake body is an array of coordinates

#### Foods
- type: `IPositionSchema[]`
- most up-to-date position of all foods

#### Board
- type: `(string | null)[][]`
- abstract representation of the board in the form of array of arrays (rows and cols)
- if there is `food = 'FOOD'`
- if there is `player = ${playerId}`

## Rules
- amount of food will be always same or more than number of players
- there are only 3 directions a snake can go (forward, left, right; no backwards)
- minimal length of snakes is 3 cells

## CICD
### CI
1. github workflow on feature branches to build a package
2. using makefile to execute the commands
3. github workflow on master branch to build a package as well as release to S3 - release bucket
4. using makefile to execute commands as well as gulpfile for zipping

In simple words, everytime I push something to a feature branch, github will try to build a package that is ready to be deployed (npm run build). 
Everytime I push to master branch, not only will a package be created but a version file will be added to the build. 
This build is then saved as an artifact on github as well as saved to the S3 release bucket

### CD
- on push to master, deploy to staging - happening in the infrastructure repository

Everytime I push to master (merge pull from feature), a workflow on my infrastructure repository is triggered.
This will copy latest version from the S3 release bucket and deploy it to the public staging bucket.
From there the static files are served.

## Resources
- [inspiration for ticks](https://bookout.co.il/2020/07/16/cool-snake-with-react-hooks/)
- [deployment to S3](https://ljmocic.medium.com/deploying-react-application-to-aws-s3-using-github-actions-85addacaeace)
