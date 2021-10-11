import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { ChainId, Config, DAppProvider } from '@usedapp/core'

const config: Config = {
  readOnlyChainId: ChainId.Hardhat,
  readOnlyUrls: {
    [ChainId.Hardhat]: 'http://127.0.0.1:8545/'
  },
  supportedChains: [ChainId.Hardhat]
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  )
}
export default MyApp
