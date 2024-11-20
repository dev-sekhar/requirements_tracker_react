import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./styles/Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <Header />
      </div>
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
