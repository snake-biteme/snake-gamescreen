import React from 'react';
import gather from '../../../../images/rules/gather-svg.svg';
import qr from '../../../../images/rules/qr-svg.svg';
import controller from '../../../../images/rules/controller-svg.svg';
import styles from './Rules.module.css';

function Rules() {
    return (
        <div className={styles.container}>
            <img className={styles.depiction} src={gather}/>
            <p className={styles.description}>Gather everyone around this screen</p>
            <img className={styles.depiction} src={qr}/>
            <p className={styles.description}>Scan the QR code and open the link on your phone</p>
            <img className={styles.depiction} src={controller}/>
            <p className={styles.description}>Press start and control your snake using your phone</p>
        </div>
    );
}

export default Rules;