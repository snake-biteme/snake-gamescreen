import React from 'react';
import Title from './components/Title/Title';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <div className={styles.container}>
            <Title/>
            <div className={styles.qrcode}>QR Code</div>
        </div>
    );
}

export default Navbar;