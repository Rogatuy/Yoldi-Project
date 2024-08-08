import React from "react";
import Link from "next/link";
import BaseButton from "@/components/Buttons/BaseButton";
import styles from "./UserIcon.module.scss";

type UserIconProps = {
  isLogin: boolean;
  name?: string;
  slug?: string;
};

export default function UserIcon({ isLogin, name, slug }: UserIconProps) {
  return (
    <div className={styles.userBlock}>
      {isLogin ? (
        <>
          <p>{name}</p>
          <Link href={`/account/${slug}`} className={styles.userLink}>
            <span>{name ? name[0] : "?"}</span>
          </Link>
        </>
      ) : (
        <BaseButton view="link" href="/login" color="secondary" option="small" text="Войти" />
      )}
    </div>
  );
}
