import React from 'react';
import Title from './components/Title/Title';
import styles from './Navbar.module.css';
import {QRCodeSVG} from 'qrcode.react';

function Navbar() {
    const url = 'https://www.google.com';
    // className not supported
    const qrcodeStyles = {
        marginRight: '20px',
        boxShadow: '0 15px 60px hsla(0, 0%, 0%, 0.24)'
    };
    return (
        <div className={styles.container}>
            <Title/>
            <QRCodeSVG style={qrcodeStyles} value={url} size={200}/>
        </div>
    );
}

export default Navbar;