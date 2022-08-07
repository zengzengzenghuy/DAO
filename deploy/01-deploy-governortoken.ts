
// need to import these 2 package if you wanna use hardhat-deploy
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";


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
}
export default deployGovernancetoken;