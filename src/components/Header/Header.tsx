"use client";

import React from "react";
import Logo from "./components/Logo/Logo";
import UserIcon from "./components/UserIcon/UserIcon";
import styles from "./Header.module.scss";
import useGetProfile from "@/hooks/useGetProfile";

export default function Header() {
  const { data: profile, isLoading: isLoadingProfile } = useGetProfile();

  if (isLoadingProfile) {
    return (
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="global">
          <Logo />
          <div className={styles.loadingProfile}>
            <p className={styles.loadingText}>Загрузка пользователя...</p>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="global">
        <Logo />
        <UserIcon isLogin={!!profile?.name} name={profile?.name} slug={profile?.slug} />
      </nav>
    </header>
  );
}
