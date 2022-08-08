import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { VOTING_DELAY,VOTING_PERIOD,QUORUM_PERCENTAGE } from "../helper-deploy";
const deployGovernorContract :DeployFunction= async function(
    hre:HardhatRuntimeEnvironment
){
    const {getNamedAccounts,deployments} = hre;
    const {deploy,log,get} = deployments;
    const {deployer} = await getNamedAccounts();
    const governanceToken = await get("GovernanceToken");
    const timelock = await get("Timelock");
    log("deploying governor contract");
    const governorContract = await deploy(
        "GovernorContract",
        {
            from: deployer,
            args:[
                governanceToken.address,
                timelock.address,
                QUORUM_PERCENTAGE,
                VOTING_PERIOD,
                VOTING_DELAY
            ],
            log: true
        }
    );
    log(`Governor contract at ${governorContract.address}`);

}
export default deployGovernorContract;