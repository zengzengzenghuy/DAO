# DAO sample 
Refer from https://github.com/PatrickAlphaC/dao-template

## Setup
npm i    
npx hardhat node    

## Run Script
npx hardhat run scripts/propose.ts --network localhost    
npx hardhat run scripts/vote.ts --network localhost    
npx hardhat run scripts/queue-and-execute.ts --network localhost

## Check governor state
npx hardhat console --network localhost    
const governor = await ethers.getContract("GovernorContract")    
await governor.state("proposalId")    



ToDo:    
 Fix execute bug:   Error: VM Exception while processing transaction: reverted with reason string 'TimelockController: underlying transaction reverted'

