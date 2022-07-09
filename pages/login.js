import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useRouter } from "next/router";
import { async } from "@firebase/util";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpWithGoogle, login, userToken } = useAuth();



  useEffect(() => {
    let token = sessionStorage.getItem("Token");

    if (token) {
      router.push("/home");
    }
  }, [userToken]);


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Login</h1>
        {userToken ? "true" : "false"}
        <input
          placeholder="Email"
          className={styles.inputBox}
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          type="email"
        />
        <input
          placeholder="Password"
          className={styles.inputBox}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="password"
        />

        <button
          className={styles.button}
          onClick={(event) => login(email, password)}
        >
          Sign In
        </button>
        <hr />
        <button className={styles.googleAlt} onClick={signUpWithGoogle}>
          Sign In with Google
        </button>
        <hr />
      </main>
    </div>
  );
}
