import React, {useEffect, useState} from 'react';
import {IAllPlayers, IScores} from '../../../interfaces/api';
import {pSBC} from '../../utils';
import styles from './Scoreboard.module.css';

interface IProps {
    players: IAllPlayers,
    scores: IScores,
}

function Scoreboard({players, scores}: IProps) {
    const [scoreBoard, setScoreBoard] = useState<JSX.Element[]>([]);

    useEffect(() => {
        // sorting an object https://stackoverflow.com/a/1069840/18631517
        const sortedScores: IScores = Object.entries(scores)
            .sort(([, a], [, b]) => b.food - a.food)
            .reduce((r, [k, v]) => ({...r, [k]: v}), {});

        const htmlList = Object.entries(sortedScores).map(([id, score]) => {
            const {color, name} = players[id];

            const active = score.status ? 'active' : 'inactive';
            // todo might not need to lighten color
            return <div key={id} className={`${styles[active]} ${styles.player}`} style={{background: pSBC(0.1, color, undefined, undefined)}}>
                <p>{active} {name} {score.food}</p>
            </div>;
        });
        setScoreBoard(htmlList);
    }, [scores]);

    return (
        <div className={styles.container}>{scoreBoard}</div>
    );
}

export default Scoreboard;