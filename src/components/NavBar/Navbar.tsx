import React from 'react';
import styles from './Navbar.module.css';
import {QRCodeSVG} from 'qrcode.react';
import {CONTROLLER_URL, SCREEN_ID} from '../../consts';
import Logo from '../Logo/Logo';

function Navbar() {

    const url = CONTROLLER_URL;
    // className not supported
    const qrcodeStyles = {
        marginRight: '1rem',
        border: '0.5rem solid var(--primary-color)',
        background: 'var(--secondary-lightest)',
        padding: '0.2rem',
        borderRadius: '1rem',
    };
    return (
        <div className={styles.container}>
            <Logo/>
            <h2 className={styles.feedback} >
                Hey! Glad you are here and thank you for playing!
                If you can, please share some feedback to <a href='mailto:info@startbite.me'>info@startbite.me</a>,
                I would love to get your opinion on how to make the game even better.
            </h2>
            <QRCodeSVG style={qrcodeStyles} value={`${url}/?screenId=${SCREEN_ID}`} size={200}/>
        </div>
    );
}

export default Navbar;
