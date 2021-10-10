import type { NextPage } from 'next'
import { useEthers } from '@usedapp/core'

const Home: NextPage = () => {
  const { activateBrowserWallet, account } = useEthers()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl">dApp Boilertplate</h1>
      <div className="py-4">
        {account ? (
          <p>Account: {account}</p>
        ) : (
          <button
            className="bg-blue-400 text-white rounded py-2 px-4"
            onClick={() => activateBrowserWallet()}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  )
}

export default Home
