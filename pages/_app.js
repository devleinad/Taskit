import '../styles/globals.css';
import {SessionProvider} from "next-auth/react";
import ContextProvider from '../contexts/ContextProvider';
import ErrorBoundary from '../components/utilities/ErrorBoundary';


function MyApp({ Component, pageProps:{session,...pageProps} }) {


  return (
      <ContextProvider>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
      </ContextProvider>
  )
}

export default MyApp
