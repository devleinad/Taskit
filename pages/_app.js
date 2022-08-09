import "../styles/globals.css";
import ContextProvider from "../contexts/ContextProvider";
import ErrorBoundary from "../components/utilities/ErrorBoundary";
import { useEffect, useState } from "react";
import axios from "axios";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   axios
  //     .get("/api/authenticate")
  //     .then((res) => {
  //       if (res.data.success) {
  //         setUser(res.data.user);
  //         setIAuthenticated(true);
  //         setIsAuthenticating(false);
  //       }
  //     })
  //     .catch((error) => {
  //       setIAuthenticated(false);
  //       setIsAuthenticating(false);
  //       console.log(error);
  //     });
  // }, [Component]);

  // if (isAuthenticating) null;

  return (
    <ContextProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ContextProvider>
  );
}

export default MyApp;
