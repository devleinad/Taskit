import '../styles/globals.css';
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
