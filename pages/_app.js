import "../styles/globals.css";
import Navbar from "../Layout/Navbar";
import AuthContextProvider from "../Context/AuthContext";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
