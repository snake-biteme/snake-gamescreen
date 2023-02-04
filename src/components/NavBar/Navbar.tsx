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
        borderRadius: '1rem',
    };
    return (
        <div className={styles.container}>
            <Logo/>
            <QRCodeSVG style={qrcodeStyles} value={`${url}/?screenId=${SCREEN_ID}`} size={200}/>
        </div>
    );
}

export default Navbar;
