import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Еще нет аккаунта?</p>
      <Link className={styles.footerLink} href="/registration">
        Зарегистрироваться
      </Link>
    </footer>
  );
}
