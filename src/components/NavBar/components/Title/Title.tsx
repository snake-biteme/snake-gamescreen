import React from 'react';
import styles from './Title.module.css';

function Title() {

    return (
        <div className={styles.logo}>
            <div className={`${styles.letter} ${styles.capital}`}>B</div>
            <div className={styles.letter}>i</div>
            <div className={styles.letter}>t</div>
            <div className={styles.letter}>e</div>
            <div className={`${styles.letter} ${styles.capital}`}>M</div>
            <div className={styles.letter}>e</div>
        </div>
    );
}

export default Title;