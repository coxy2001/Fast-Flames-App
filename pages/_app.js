import '../styles/globals.css'
import { ClickProvider } from '../contexts/click';

function FastFlames({ Component, pageProps }) {
  return <ClickProvider>
    <Component {...pageProps} />
  </ClickProvider>

}

export default FastFlames
