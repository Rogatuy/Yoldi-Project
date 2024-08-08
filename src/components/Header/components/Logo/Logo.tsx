import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Link href="/" aria-label="Homepage">
        <Image src="/reused/logo.svg" alt="Logo" width={80} height={50} />
      </Link>
      <p>Разрабатываем и запускаем сложные веб проекты</p>
    </div>
  );
}
