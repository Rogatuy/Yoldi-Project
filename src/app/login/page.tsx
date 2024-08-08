"use client";

import React from "react";
import styles from "./page.module.scss";
import Footer from "./components/Footer/Footer";
import LoginForm from "./components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <>
      <main>
        <div className={styles.loginPage}>
          <div className={styles.loginWindow}>
            <h2 className={styles.title}>Вход в Yoldi Agency</h2>
            <LoginForm></LoginForm>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
