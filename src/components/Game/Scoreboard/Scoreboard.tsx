import React from 'react';
import {IAllPlayers, IScores} from '../../../interfaces/api';
import {pSBC} from '../../utils';

interface IProps {
    players: IAllPlayers,
    scores: IScores,
}

function Scoreboard({players, scores}: IProps) {
    const htmlList = Object.values(players).map(player => {
        return <div key={player.playerId} style={{background: pSBC(0.1, player.color, undefined, undefined)}}>
            <p>{player.name} {scores[player.playerId]?.food}</p>
        </div>;
    });

    return (
        <div>{htmlList}</div>
    );
}

export default Scoreboard;