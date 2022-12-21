import React from 'react';
import styles from './SmallScreen.module.css';
import Logo from '../Logo/Logo';
function SmallScreen () {

    return (
        <>
            <Logo/>
            <p className={styles.smallScreen}>This screen is too small to display the game board, please use a larger
                one!</p>
        </>
    );
}

export default SmallScreen;
