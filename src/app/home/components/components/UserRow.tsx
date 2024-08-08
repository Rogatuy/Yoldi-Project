import React from "react";
import Link from "next/link";
import styles from "./UserRow.module.scss";

type UserRowProps = {
  name: string;
  slug: string;
  email: string;
};

export default function UserRow({ name, email, slug }: UserRowProps) {
  return (
    <Link href={`/account/${slug}`} className={styles.userRow}>
      <div className={styles.userImage}>
        <span>{name ? name[0] : "?"}</span>
      </div>
      <div className={styles.userInfo}>
        <p className={styles.name}>{name}</p>
        <p className={styles.email}>{email}</p>
      </div>
    </Link>
  );
}
