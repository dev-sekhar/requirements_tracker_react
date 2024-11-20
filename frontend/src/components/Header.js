import React from 'react';
import DropdownMenu from './DropdownMenu';
import styles from './styles/Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Requirements Tracker</h1>
      <DropdownMenu />
    </header>
  );
}

export default Header;
