import React, { useEffect } from "react";
import BaseButton from "@/components/Buttons/BaseButton";

import styles from "./UserModal.module.scss";
import useGetProfile from "@/hooks/useGetProfile";
import UserForm from "./components/UserForm";

type UserModalProps = {
  closeModal: () => void;
};

export default function UserModal({ closeModal }: UserModalProps) {
  const { data: profile, error: errorProfile, isLoading: isLoadingProfile } = useGetProfile();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (isLoadingProfile) {
    return (
      <div className={styles.userModal}>
        <div className={styles.modalBg}></div>
        <div className={styles.modalContent}>
          <h2>Загрузка данных...</h2>
        </div>
      </div>
    );
  }

  if (errorProfile) {
    return (
      <div className={styles.userModal}>
        <div className={styles.modalBg}></div>
        <div className={styles.modalContent}>
          <h2>Такого пользователя не существует</h2>
          <BaseButton
            view="button"
            type="button"
            color="secondary"
            option="large"
            text="Закрыть"
            onClick={closeModal}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.userModal}>
      <div className={styles.modalBg}></div>
      <div className={styles.modalContent}>
        <h2 className={styles.name}>Редактировать профиль</h2>
        {profile && (
          <UserForm
            nameProfile={profile.name}
            slugProfile={profile.slug}
            descriptionProfile={profile.description}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
}
