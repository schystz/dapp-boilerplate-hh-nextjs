import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { ChainId, Config, DAppProvider } from '@usedapp/core'

const config: Config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]:
      'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934'
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  )
}
export default MyApp
