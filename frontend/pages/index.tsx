import type { NextPage } from 'next'
import { ChainId, useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'
import { useGreet, useSetGreeting } from '../hooks/useGreeter'

const Home: NextPage = () => {
  const { activateBrowserWallet, account, chainId } = useEthers()
  const [error, setError] = useState<string | undefined>(undefined)
  const greet = useGreet()
  const [message, setMessage] = useState(greet)
  const { send: setGreeting } = useSetGreeting()

  useEffect(() => {
    if (message === undefined) {
      setMessage(greet)
    }
  }, [greet])

  useEffect(() => {
    setError(undefined)
  }, [chainId])

  const onError = (e: Error) => {
    if (e.message.includes('Unsupported chain')) {
      setError(
        `Unsupported chain. Please connect to hardhat chain (chainId: ${ChainId.Hardhat}).`
      )
    } else {
      setError('Something went wrong.')
    }
  }

  const updateGreeting = async () => {
    await setGreeting(message)
  }

  return (
    <div className="container mx-auto p-4 h-screen flex items-center justify-center flex-col">
      <div className="text-4xl">{greet}</div>

      {error && <div className="py-4 text-red-400">{error}</div>}

      <div className="py-4">
        {account ? (
          <div className="flex space-x-4">
            <input
              type="text"
              className="border rounded"
              value={message || ''}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="bg-green-400 text-white rounded py-2 px-4"
              onClick={() => updateGreeting()}
            >
              Update
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-400 text-white rounded py-2 px-4"
            onClick={() => activateBrowserWallet(onError)}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  )
}

export default Home
