import UserInfo from "./components/UserInfo";
import styles from "./account.module.scss";

export default function User({ params }: { params: { slug: string } }) {
  return (
    <main className={styles.mainUser}>
      <UserInfo slug={params.slug}></UserInfo>
    </main>
  );
}
