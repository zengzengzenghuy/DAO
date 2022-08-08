
// need to import these 2 package if you wanna use hardhat-deploy
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";


const deployGovernancetoken: DeployFunction = async function(
    hre:HardhatRuntimeEnvironment
    // passing hre when using command npx hardhat xxx
){
    const {getNamedAccounts, deployments} = hre;
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();
    log("Deployin GovernanceToken contract")
    const governanceToken = await deploy("GovernanceToken",{
        from: deployer,
        args: [],
        log: true
    })
    log(`GovernanceToken at ${governanceToken.address}`);
    log(`Delegating to ${deployer}`);
    await delegate(governanceToken.address,deployer);
    log("delegated!")
}

const delegate = async(governanceTokenAddr: string, delegatedAccount: string)=>{
    const governancetoken = await ethers.getContractAt("GovernanceToken",governanceTokenAddr);
    // calling ERC20Votes.sol delegate()
    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Votes.sol#L126
    const txResponse = await governancetoken.delegate(delegatedAccount);
    await txResponse.wait(1) // wait for 1 block 
    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Votes.sol#L50
    // checkpoint is the votes of certain account at certain block
    console.log(`Checkpoints: ${await governancetoken.numCheckpoints(delegatedAccount)}`)
}
export default deployGovernancetoken;