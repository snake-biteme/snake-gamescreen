import React from 'react';
import styles from '../NavBar/Navbar.module.css';
import logo from '../../images/logo.png';

function Logo() {
    return (
        <img className={styles.logo} src={logo} alt="BiteMe letters each in its own square bordered with green color"
            title="BiteMe logo"/>
    );
}

export default Logo;
