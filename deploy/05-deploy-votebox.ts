import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployVotebox: DeployFunction= async function(
    hre:HardhatRuntimeEnvironment
){
    const {getNamedAccounts,deployments} =hre;
    const {deploy,log}= deployments;
    const { deployer }= await getNamedAccounts();
    log("Deploy Votebox");
    const box = await deploy("Votebox",{
        from: deployer,
        args: [],
        log: true
    });
    log(`VoteBox at ${box.address}`);

    const Votebox = await ethers.getContractAt("Votebox",box.address);
    const timelock = await ethers.getContract("Timelock");
    const transferTx =await Votebox.transferOwnership(timelock.address);
    await transferTx.wait(1);
}

export default deployVotebox;