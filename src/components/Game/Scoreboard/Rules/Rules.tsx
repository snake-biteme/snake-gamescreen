import React from 'react';
import gather from '../../../../images/rules/gather-svg.svg';
import qr from '../../../../images/rules/qr-svg.svg';
import controller from '../../../../images/rules/controller-svg.svg';
import styles from './Rules.module.css';

function Rules() {
    return (
        <div className={styles.container}>
            <img className={styles.depiction} src={gather} alt="figures in front of a screen" title="Gather around"/>
            <p className={styles.description}>Gather everyone around this screen</p>
            <img className={styles.depiction} src={qr} alt="qr code on a mobile screen" title="Scan QR code"/>
            <p className={styles.description}>Scan the QR code and open the link on your phone</p>
            <img className={styles.depiction} src={controller} alt="game controller buttons on mobile screen" title="Phone controller"/>
            <p className={styles.description}>Press start and control your snake using your phone</p>
        </div>
    );
}

export default Rules;