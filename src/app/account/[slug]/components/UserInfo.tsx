"use client";

import React, { useState } from "react";
import { useAuthState } from "@/context/AuthState";
import BaseButton from "@/components/Buttons/BaseButton";
import UserModal from "./components/UserModal";
import useGetProfile from "@/hooks/useGetProfile";
import useGetUser from "@/hooks/useGetUser";
import styles from "./UserInfo.module.scss";

type UserProps = {
  slug: string;
};

export default function UserInfo({ slug }: UserProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { deleteKey } = useAuthState();
  const { data: user, error: userError, isLoading: isLoadingUser, mutate } = useGetUser(slug);
  const { data: profile, isLoading: isLoadingProfile } = useGetProfile();

  const logOut = () => {
    deleteKey();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    mutate();
    setIsModalOpen(false);
  };

  if (userError) {
    return (
      <div className={styles.userError}>
        <p>Такого пользователя не существует</p>
      </div>
    );
  }

  if (isLoadingUser || isLoadingProfile) {
    return (
      <div className={styles.userLoading}>
        <p>Загрузка пользователя...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      {user && (
        <>
          <div className={styles.userInfo}>
            <div className={styles.userCover}></div>
            <div className={styles.infoBlock}>
              <div className={styles.image}>
                <span>{user.name[0]}</span>
              </div>
              <div className={styles.headerBlock}>
                <p className={styles.name}>{user.name}</p>
                <p className={styles.email}>{user.email}</p>
              </div>
              {profile && user.slug === profile.slug && (
                <div className={styles.correct}>
                  <BaseButton
                    view="button"
                    text="Редактировать"
                    type="button"
                    icon="pen"
                    color="secondary"
                    option="small"
                    onClick={openModal}
                  />
                </div>
              )}
              {user.description !== "" && user.description !== null && (
                <p className={styles.description}>{user.description}</p>
              )}
              {profile && user.slug === profile.slug && (
                <div className={styles.logOut}>
                  <BaseButton
                    view="button"
                    text="Выйти"
                    type="button"
                    icon="exit"
                    color="secondary"
                    option="small"
                    onClick={logOut}
                  />
                </div>
              )}
            </div>
          </div>
          {isModalOpen && <UserModal closeModal={closeModal} />}
        </>
      )}
    </>
  );
}
