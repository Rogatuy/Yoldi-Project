import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Уже есть аккаунт?</p>
      <Link className={styles.footerLink} href="/login" aria-label="Login page">
        Войти
      </Link>
    </footer>
  );
}
