import React from 'react';
import {IPlayerSchema, IScore} from '../../../../interfaces/api';
import styles from './Player.module.css';

interface IProps {
    score: IScore
    player: IPlayerSchema,
}

function Player({player, score}: IProps) {
    const {color, name} = player;
    const active = score.status ? 'active' : 'inactive';
    return (
        <div className={`${styles[active]} ${styles.player}`}>
            <div className={styles.square} style={{background: color}}/>
            <p>{name}</p>
            <span>{score.food}</span>
        </div>
    );
}

export default Player;