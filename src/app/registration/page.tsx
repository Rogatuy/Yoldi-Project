"use client";

import React from "react";
import Footer from "./components/Footer/Footer";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import styles from "./page.module.scss";

export default function RegistrationPage() {
  return (
    <>
      <main>
        <div className={styles.registrationPage}>
          <div className={styles.registrationWindow}>
            <h2 className={styles.title}>Регистрация в Yoldi Agency</h2>
            <RegistrationForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
