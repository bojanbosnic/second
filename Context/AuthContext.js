import React, { Children } from "react";
import { useRouter } from "next/router";
import { useState, useEffect, createContext, useContext } from "react";

import { app } from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  console.log(userToken);

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user);
        localStorage.setItem("Token", response.user.accessToken);
        // setIsLoaded(true)
        router.push("/home");
      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        // setIsLoaded(false);
        localStorage.clear("Token");
        router.push("/login");
        console.log("succes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

useEffect(()=>{
    let token = localStorage.getItem("Token");
    setUserToken(token);
},[])

  return (
    <AuthContext.Provider value={{ login, signout, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
// const signUpWithGoogle = () => {
//   signInWithPopup(auth, googleProvider)
//   .then((response) => {
//     sessionStorage.setItem("Token", response.user.accessToken);
//     console.log(response.user);
//     router.push("/home");
//   });
// };
