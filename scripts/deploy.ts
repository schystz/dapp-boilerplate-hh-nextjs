// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat'
import path from 'path'
import mkdirp from 'mkdirp'
import fs from 'fs'

const writeToFile = (output: {}) => {
  const outputConfigDir = path.join(__dirname, `../artifacts/`)
  mkdirp.sync(outputConfigDir)
  const outputConfigPath = `/${outputConfigDir}/addresses.json`
  fs.writeFileSync(outputConfigPath, JSON.stringify(output, null, 4))
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const addresses: { [key: string]: string } = {}

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory('Greeter')
  const greeter = await Greeter.deploy('Hello, Hardhat!')

  await greeter.deployed()
  addresses['greeter'] = greeter.address

  console.log('Greeter deployed to:', greeter.address)
  writeToFile(addresses)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
