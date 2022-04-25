import React from 'react';
import {IPlayerSchema, IScore} from '../../../../interfaces/api';
import styles from './Player.module.css';
import {pSBC} from '../../../utils';

interface IProps {
    score: IScore
    player: IPlayerSchema,
}

function Player({player, score}: IProps) {
    const {color, name} = player;
    const active = score.status ? 'active' : 'inactive';
    return (
        <div className={`${styles[active]} ${styles.player}`}>
            <div className={styles.square} style={score.status ? {background: color} : {background: pSBC(0.4, color, '#ffffff', true)}}/>
            <p className={styles.name}>{name}</p>
            <span className={styles.food}>{score.food}</span>
        </div>
    );
}

export default Player;