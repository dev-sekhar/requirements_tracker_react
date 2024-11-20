import React from 'react';
import styles from './styles/Footer.module.css'; // Import footer styles

function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.footerText}>© 2024 My Application</p>
    </div>
  );
}

export default Footer;
