import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <div>
          <h1>Welcome, this is initial page</h1>
          <h2>
            Firebase Firestore <br /> Getting started with firebase 9
          </h2>
        </div>
      </div>
    </div>
  );
}
