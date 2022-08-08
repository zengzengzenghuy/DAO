import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { MIN_DELAY } from "../helper-deploy";
const deployTimeLock: DeployFunction= async function(
    hre:HardhatRuntimeEnvironment
){
    const {getNamedAccounts,deployments} = hre;
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();
    log("deploying timelock and wait for confirmations");
    const timelock = await deploy("Timelock",{
        from: deployer,
        args: [MIN_DELAY,[],[]],
        log:true
    });
    log(`TimeLock at ${timelock.address}`);
}
export default deployTimeLock;