import { ethers,network } from "hardhat"
import { DESCRIPTION, developmentChains, FUNC, MIN_DELAY, NEW_STORE_VALUE } from "../helper-deploy";
import { moveBlocks } from "../utils/move-blocks";
import { moveTime } from "../utils/move-time";


export async function queueAndExecute(){
    const args = [NEW_STORE_VALUE];
    const functionToCall = FUNC;
    const Box = await ethers.getContract("Votebox")
    const encodedFunctionCall = Box.interface.encodeFunctionData(functionToCall,args);
    const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(DESCRIPTION));
    // function queue(
    //     address[] memory targets,
    //     uint256[] memory values,
    //     bytes[] memory calldatas,
    //     bytes32 descriptionHash
    // ) 
    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/extensions/GovernorTimelockCompound.sol#L91
    const governor = await ethers.getContract("GovernorContract");
    console.log("Queueing...")
    const queueTx = await governor.queue([Box.address],[0],[encodedFunctionCall],descriptionHash)
    if(developmentChains.includes(network.name)){
        await moveTime(MIN_DELAY+1);
        await moveBlocks(1);
    }
    await queueTx.wait(1);
    console.log("Executing...")
    // will fail on testnet because you need to wait for MIN_DELAY
    //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/extensions/GovernorTimelockCompound.sol#L119
    const executeTx = await governor.execute(
        [Box.address],[0],[encodedFunctionCall],descriptionHash
    );
    await executeTx.wait(1);
    console.log(`Box new value: ${await Box.getVote()}`);
}

queueAndExecute()
    .then(()=>process.exit(0))
    .catch((error)=>{
        console.error(error)
        process.exit(1)
    })