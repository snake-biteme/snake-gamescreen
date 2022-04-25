import React from 'react';
import styles from './Navbar.module.css';
import {QRCodeSVG} from 'qrcode.react';
import {CONTROLLER_URL, SCREEN_ID} from '../../consts';
import logo from '../../images/logo.png';

function Navbar() {

    const url = CONTROLLER_URL;
    // className not supported
    const qrcodeStyles = {
        marginRight: '20px',
        boxShadow: '0 15px 60px hsla(0, 0%, 0%, 0.24)'
    };
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo}/>
            <QRCodeSVG style={qrcodeStyles} value={`${url}/?screenId=${SCREEN_ID}`} size={200}/>
        </div>
    );
}

export default Navbar;