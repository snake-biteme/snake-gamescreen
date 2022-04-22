import React from 'react';
import {IAllPlayers, IScores} from '../../../interfaces/api';
import {pSBC} from '../../utils';

interface IProps {
    players: IAllPlayers,
    scores: IScores,
}

function Scoreboard({players, scores}: IProps) {
    const htmlList = Object.values(players).map(player => {
        const {playerId, color, name} = player;
        return <div key={playerId} style={{background: pSBC(0.1, color, undefined, undefined)}}>
            <p>{scores[playerId]?.status} {name} {scores[playerId]?.food}</p>
        </div>;
    });

    return (
        <div>{htmlList}</div>
    );
}

export default Scoreboard;