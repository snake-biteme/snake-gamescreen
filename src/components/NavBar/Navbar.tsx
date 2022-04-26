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
        // boxShadow: '0 15px 60px hsla(0, 0%, 0%, 0.24)',
        border: '10px solid var(--primary-color)',
        borderRadius: '20px',
    };
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="BiteMe letters each in its own square bordered with green color" title="BiteMe logo"/>
            <QRCodeSVG style={qrcodeStyles} value={`${url}/?screenId=${SCREEN_ID}`} size={200} />
        </div>
    );
}

export default Navbar;