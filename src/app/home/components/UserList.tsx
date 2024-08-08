"use client";

import UserRow from "./components/UserRow";
import useGetUsers from "@/hooks/useGetUsers";
import styles from "./UserList.module.scss";

export default function UsersList() {
  const { data: users, error, isLoading } = useGetUsers();

  if (error) {
    return (
      <div className={styles.userList}>
        <p>Ошибка загрузки пользователей. Попробуйте позже</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.userList}>
        <p className={styles.loading}>Загрузка списка пользователей...</p>
      </div>
    );
  }

  return (
    <div className={styles.userList}>
      <h2>Cписок аккаунтов</h2>
      <div className={styles.userWrapper}>
        {users && users.map((user) => <UserRow key={user.slug} name={user.name} email={user.email} slug={user.slug} />)}
      </div>
    </div>
  );
}
