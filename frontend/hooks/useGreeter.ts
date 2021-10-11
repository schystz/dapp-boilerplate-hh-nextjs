import { useContractCall, useContractFunction } from '@usedapp/core'
import { Contract, utils } from 'ethers'
import GreeterJSON from '../../artifacts/contracts/Greeter.sol/Greeter.json'
import addresses from '../../artifacts/addresses.json'

const GreeterInterface = new utils.Interface(GreeterJSON.abi)
const greeterAddress = addresses['greeter']
const GreeterContract = new Contract(greeterAddress, GreeterInterface)

const useGreet = (): string | undefined => {
  const [greet] =
    useContractCall({
      abi: GreeterInterface,
      address: greeterAddress,
      method: 'greet',
      args: []
    }) ?? []
  return greet
}

const useSetGreeting = () => {
  return useContractFunction(GreeterContract, 'setGreeting', {
    transactionName: 'Set greeting'
  })
}

export { useGreet, useSetGreeting }
