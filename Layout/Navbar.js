import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const { userToken, signout } = useAuth();


  return (
    <div>
      <nav>
        <ul className={styles.navbar}>
          {userToken ? (
            <>
              <li>
                <Link href={"/home"}>
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href={"/example"}>
                  <a>Example</a>
                </Link>
              </li>
              <li>
                <button onClick={signout}>Sign Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={"/"}>
                  <a>Initial page</a>
                </Link>
              </li>
              <li>
                <Link href={"/login"}>
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href={"/register"}>
                  <a>Register</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
