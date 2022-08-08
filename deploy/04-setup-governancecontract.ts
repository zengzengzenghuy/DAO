import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const setupContracts: DeployFunction= async function(
    hre:HardhatRuntimeEnvironment
){
    const {getNamedAccounts,deployments} = hre;
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    const governanceToken = await ethers.getContract("GovernanceToken",deployer); // everytime deployer will be the msg.sender
    const timelock = await ethers.getContract("Timelock",deployer);
    const governor = await ethers.getContract("GovernorContract",deployer);
    log("setting up contracts for roles");
      // would be great to use multicall here...
      // source: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/TimelockController.sol#L27

    const proposerRole = await timelock.PROPOSER_ROLE()
    const executorRole = await timelock.EXECUTOR_ROLE()
    const adminRole = await timelock.TIMELOCK_ADMIN_ROLE()
    // only governor can propose to timelock
    const proposerTx = await timelock.grantRole(proposerRole,governor.address);
    await proposerTx.wait(1);
    // anyone can call execute
    const executorTx = await timelock.grantRole(executorRole,ethers.constants.AddressZero)
    await executorTx.wait(1);
    // no one is the admin role of timelock now!
    const revokeTx = await timelock.revokeRole(adminRole,deployer);
    await revokeTx.wait(1)
}
export default setupContracts;