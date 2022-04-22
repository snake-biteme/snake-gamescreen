import React from 'react';
import {IAllPlayers} from '../../../interfaces/api';
import {pSBC} from '../../utils';

interface IProps {
    players: IAllPlayers,
}

function Scoreboard({players}: IProps) {
    const htmlList = Object.values(players).map(player => {
        return <div key={player.playerId} style={{background: pSBC(0.1, player.color, undefined, undefined)}}>
            <p>{player.name}</p>
        </div>;
    });

    return (
        <div>{htmlList}</div>
    );
}

export default Scoreboard;